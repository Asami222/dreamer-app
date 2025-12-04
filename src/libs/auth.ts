import { getServerSession as originalGetServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions, User } from "next-auth";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";
import { loginSchema } from "./validations/loginSchema";

// AuthOptions は next-auth から直接 import でOK
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // JWTベース（RDBへのセッション保存を避ける）
  providers: [
    // --- Google 認証 ---
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      profile(profile) {
        // email の前半 + ランダム文字列を使って username を生成
        //const baseUsername = profile.email?.split("@")[0] ?? "user";
        //const randomSuffix = Math.random().toString(36).slice(-4);
        //const name = `${baseUsername}_${randomSuffix}`;

        return {
          id: profile.sub,
          name: profile.name,
          provider: "google",
          profileImageUrl: profile.picture ?? "/images/noImg.webp",
        } as unknown as User;
      },
    }),

    // --- Credentials 認証 ---
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // 入力バリデーション
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          throw new Error(parsed.error.issues.map(i => i.message).join(", "));
        }

        const { name, password } = parsed.data;

        // DBからユーザーを検索
        const user = await prisma.user.findUnique({ where: { name } });
        if (!user || !user.password) {
          throw new Error("ユーザー名またはパスワードが間違っています");
        }

        // パスワード検証
        const isValid = await compare(password, user.password);
        if (!isValid) {
          throw new Error("ユーザー名またはパスワードが間違っています");
        }

        // 認証成功 → セッションで使う情報を返す。セキュリティのため password は返さない
        return {
          id: user.id,
          name: user.name,
          provider: user.provider ?? "credentials",
          profileImageUrl: user.profileImageUrl ?? null,
        } as unknown as User;
      },
    }),
  ],

  // --- JWT / Session のコールバック ---
  callbacks: {
    /**
    * JWTトークンにUser情報を格納
    */
    async jwt({ token, user }) {
      if (user) {
        // `user` は authorize または OAuth ログイン成功時のみ存在
        //認証時（jwt コールバック内など）に user.email を一時的に扱うのは問題ない(基本不要）。sessionはクライアントサイドでも参照されるデータなので、安全の面からemailは外す
        token.id = user.id;
        token.name = user.name ?? "";
        token.provider = (user as User).provider ?? null;
        token.profileImageUrl = (user as User).profileImageUrl ?? null;

        // Profile のデータを取得し token.profile に入れる
        const profile = await prisma.profile.findUnique({
          where: { userId: user.id },
          select: { 
            displayName: true,
            stars: true,
            dream: true,
            limit: true,
          },
        });
        token.profile = {
          displayName: profile?.displayName ?? null,
          stars: profile?.stars ?? null,
          dream: profile?.dream ?? null,
          limit: profile?.limit ?? null,
        };
      }
      return token;
    },
    /**
     * SessionオブジェクトにJWT内容をコピー
     * useSession() で使うデータ
     */
    async session({ session, token }) {
      // `session.user` に JWT の値を反映
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.profileImageUrl = token.profileImageUrl ?? undefined;

      // profile をネストして反映
      session.user.profile = {
        displayName: token.profile?.displayName ?? undefined,
        stars: token.profile?.stars ?? undefined,
        dream: token.profile?.dream ?? undefined,
        limit: token.profile?.limit ?? undefined,
      };
      return session;
    },
  },
  // --- Pages ---
  pages: {
    signIn: "/login",
  },
};
/**
 * SSR用ヘルパー
 */
export const getServerSession = async() => originalGetServerSession(authOptions);

declare module "next-auth" {
  /** PrismaのUserモデルに基づくが、passwordなどは除外 */
  interface User {
    id: string;
    name: string;
    email?: string | null;
    provider?: string | null; // "credentials" | "google" など
    profileImageUrl?: string | null;
    createdAt?: Date | string;
    password?: string | null; // optional にしておく
  }

  /** セッションに含まれるユーザー情報（パスワードなどは含めない） */
  interface Session {
    user: {
      id: string;
      name: string;
      profileImageUrl?: string | null;
      profile?: {
        displayName?: string;
        numberOfStars?: number;
        dream?: string;
        limit?: string;
      };
    }
  }
}

declare module "next-auth/jwt" {
  /** JWT に格納されるユーザー情報 */
  interface JWT {
    id: string;
    name: string;
    profileImageUrl?: string | null;
    provider?: string | null;
    profile?: {
      displayName?: string | null;
      numberOfStars?: number | null;
      dream?: string | null;
      limit?: string | null;
    };
  }
}

// 👇 これはモジュールとして扱われないようにするために必要
export {};
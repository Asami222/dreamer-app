import { NextResponse } from "next/server";
import { prisma } from "src/libs/prisma";
import { hash } from "bcryptjs";
import { signupSchema } from "src/libs/validations/loginSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map(i => i.message).join(", ") },
        { status: 400 }
      );
    }

    const { name, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { name } });
    if (existingUser) {
      return NextResponse.json(
        { error: "入力されたユーザー名は既に存在しています" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        provider: "credentials",
        profileImageUrl: "/images/noImg.webp",
      },
    });

    // ✅ v4ではここで signIn() は呼べない
    return NextResponse.json({
      message: "サインアップに成功しました",
      user: {
        id: newUser.id,
        name: newUser.name,
        provider: newUser.provider,
        profileImageUrl: newUser.profileImageUrl,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "ユーザー作成に失敗しました" },
      { status: 500 }
    );
  }
}
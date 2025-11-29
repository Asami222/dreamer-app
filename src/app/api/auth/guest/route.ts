
import { prisma } from "src/libs/prisma";
import { NextResponse } from "next/server";

export async function POST() {

  const name = "guest";
  const password = "guestpass"; // 固定（DBにはハッシュで保存）
  const displayName = "ゲスト";
  const dream = "世界を旅する鳥";
  const numberOfStars = 5;

  try {
  // ゲストユーザーをDBで確認 or 作成
  const existing = await prisma.user.findUnique({ where: { name } });

  if (!existing) {
    const bcrypt = await import("bcryptjs");
    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        password: hashed,
        displayName,
        dream,
        numberOfStars,
      },
    });
  }
  return NextResponse.json({ message: "ゲストユーザーを用意しました" });
  } catch (err) {
    console.error("Guest creation error:", err);
    return NextResponse.json(
      { error: "ゲストユーザーの作成に失敗しました" },
      { status: 500 }
    );
  }
}
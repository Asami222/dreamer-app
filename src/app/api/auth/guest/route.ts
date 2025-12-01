// api/auth/guest/route.ts
import { prisma } from "src/libs/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  const name = "guest";
  const password = "guestpass"; // 固定（DBにはハッシュで保存）
  const displayName = "ゲスト";
  const dream = "世界を旅する鳥";
  const stars = 5;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { name },
      include: { profile: true },
    });

    if (!existingUser) {
      const bcrypt = await import("bcryptjs");
      const hashed = await bcrypt.hash(password, 10);

      // User作成 & Profile作成
      await prisma.user.create({
        data: {
          name,
          password: hashed,
          provider: "credentials",
          profile: {
            create: {
              displayName,
              dream,
              stars,
            },
          },
        },
      });

    } else if (!existingUser.profile) {
      // 既にUserが存在してProfileが無い場合 → Profileだけ作成
      await prisma.profile.create({
        data: {
          displayName,
          dream,
          stars,
          userId: existingUser.id,
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
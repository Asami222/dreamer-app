// /api/auth/guest/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { prisma } from "@/libs/prisma";
import { randomUUID } from "crypto";

export async function POST() {
  const supabase = await createClient();

  const email = `guest_${randomUUID()}@guest.local`;
  const password = randomUUID();

  // 1. Auth ユーザー作成
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name: "ゲスト" },
    },
  });

  if (signUpError || !signUpData.user) {
    return NextResponse.json({ error: "ゲスト作成失敗" }, { status: 500 });
  }

  // 2. 即ログイン
  await supabase.auth.signInWithPassword({ email, password });

  const user = signUpData.user;

  // 3. profiles を必ず作る
  await prisma.profile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      displayName: "ゲストユーザー",
      profileImageUrl: "/images/noImg.webp",
    },
  });

  return NextResponse.json({ ok: true });
}
import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { prisma } from "@/libs/prisma";
import { randomUUID } from "crypto";

export async function POST() {
  const supabase = await createClient();

  const email = `guest_${randomUUID()}@guest.local`;
  const password = randomUUID();

  // 1. signup
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name: "ゲスト" } },
  });

  if (signUpError || !signUpData.user) {
    return NextResponse.json({ error: "ゲスト作成失敗" }, { status: 500 });
  }

  // 2. signin
  const { data: signInData, error: signInError } =
    await supabase.auth.signInWithPassword({ email, password });

  if (signInError || !signInData.session) {
    return NextResponse.json({ error: "guest login failed" }, { status: 500 });
  }

  // 3. profile upsert
  await prisma.profile.upsert({
    where: { userId: signUpData.user.id },
    update: {},
    create: {
      userId: signUpData.user.id,
      displayName: "ゲストユーザー",
      profileImageUrl: null,
    },
  });

  // ★ここが最重要
  return NextResponse.json({
    session: signInData.session,
  });
}
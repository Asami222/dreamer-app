import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
//import { createClient } from "@/libs/supabase/server";
import { prisma } from "@/libs/prisma";
import { randomUUID } from "crypto";

export async function POST() {
  //const supabase = await createClient();
  const cookieStore = await cookies();

  // レスポンス作成
  const response = NextResponse.json({ ok: true });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          //レスポンスにCookieをセット
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

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
  return response;
}
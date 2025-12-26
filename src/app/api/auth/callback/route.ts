// /api/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { prisma } from "@/libs/prisma";

export async function GET(request: Request) {
  const supabase = await createClient();

  // 🔑 OAuth code → session 確立
  const { data, error } = await supabase.auth.exchangeCodeForSession(
    new URL(request.url).searchParams.get("code")!
  );

  if (error || !data.session) {
    return NextResponse.redirect(
      new URL("/auth/login?error=oauth_error",process.env.NEXT_PUBLIC_BASE_URL)
    );
  }

  const user = data.session.user;

  // profile upsert
  await prisma.profile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      displayName:
        user.user_metadata?.name ??
        user.user_metadata?.full_name ??
        "ユーザー",
      profileImageUrl: user.user_metadata?.avatar_url ?? "/images/noImg.webp",
    },
  });

  return NextResponse.redirect(
    new URL("/user", process.env.API_HOST)
  );
}
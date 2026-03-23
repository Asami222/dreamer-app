// /api/auth/callback/route.ts
import { NextResponse } from "next/server";
//import { createClient } from "@/libs/supabase/server";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { prisma } from "@/libs/prisma";

export async function GET(request: Request) {
  const cookieStore = await cookies();

  const response = NextResponse.redirect(
    new URL("/user", process.env.API_HOST)
  );

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options); 
          });
        },
      },
    }
  );
  // OAuth code → session 確立
  const code = new URL(request.url).searchParams.get("code")!
  

  if (!code) {
    return NextResponse.redirect(
      new URL("/auth/login?error=no_code",process.env.API_HOST)
    );
  }

  // OAuth code → session 確立（ここでCookieがセットされる）
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.session) {
    return NextResponse.redirect(
      new URL("/auth/login?error=oauth_error", process.env.API_HOST)
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

  return response;
  
}
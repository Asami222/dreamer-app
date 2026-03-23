import { NextResponse } from "next/server";
//import { createClient } from "@/libs/supabase/server";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { prisma } from "@/libs/prisma";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  //const supabase = await createClient();
  const cookieStore = await cookies();

  // レスポンスを先に作る
  const response = NextResponse.json({ ok: true });

  // Cookieをレスポンスに紐づける
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options); //重要
          });
        },
      },
    }
  );

  // signup
  const { data: signUpData, error: signUpError } =
    await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

  if (signUpError || !signUpData.user) {
    return NextResponse.json({ error: signUpError?.code }, { status: 400 });
  }

  // signin
  const { data: signInData, error: signInError } =
    await supabase.auth.signInWithPassword({ email, password });

  if (signInError || !signInData.session) {
    return NextResponse.json({ error: "login_failed" }, { status: 400 });
  }

  // profile upsert
  await prisma.profile.upsert({
    where: { userId: signUpData.user.id },
    update: {},
    create: {
      userId: signUpData.user.id,
      displayName: name,
      profileImageUrl: null,
    },
  });

  return response;
}
// /app/api/login/route.ts
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: "無効な入力" }), { status: 400 });
  }

  const { username, password } = parsed.data;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: username, // メールでも可
    password,
  });

  if (error) {
    return new Response(JSON.stringify({ error: "認証に失敗しました" }), { status: 401 });
  }

  return new Response(JSON.stringify({ user: data.user }), { status: 200 });
}
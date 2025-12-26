import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export async function createClient(accessToken?: string) {
  // ★ あなたの環境では cookies() が Promise を返す
  const cookieStore = await cookies(); 

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch (_) {
            // Server Action の場合はここは無視
          }
        },
      },

      global: {
        fetch: (url, options = {}) =>
          fetch(url, {
            ...options,
            headers: {
              ...(options.headers || {}),
              ...(accessToken
                ? { Authorization: `Bearer ${accessToken}` }
                : {}),
            },
          }),
      },
    }
  );
}
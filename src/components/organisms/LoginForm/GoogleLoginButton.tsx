"use client";
import Image from "next/image";
import { supabase } from "@/libs/supabase/client";

export default function GoogleLoginButton() {
  return (
    <button
      type="button"
      onClick={() =>
        supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${location.origin}/auth/callback` },
        })
      }
      aria-label="グーグルでログイン"
      className="mx-auto flex justify-center items-center w-auto gap-2 px-4 py-2 rounded-full bg-[rgba(255,255,255,0.3)] border border-transparent transition-all duration-200 enabled:hover:border-(--text) enabled:hover:cursor-pointer enabled:hover:transition-all enabled:hover:duration-500"
    >
      <Image
        src="https://www.svgrepo.com/show/355037/google.svg"
        alt="Google"
        width={20}
        height={20}
      />
      <span>Googleでログイン</span>
    </button>
  );
}
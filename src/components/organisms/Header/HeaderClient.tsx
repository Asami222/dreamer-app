"use client";

import { useProfile } from "@/hooks/useProfile";
import { HeaderUI } from "./HeaderUI";
//import type { Profile } from "@/types/data";
import { useRouter } from "next/navigation";
import { logout } from "src/services/auth";
import type { User } from "@supabase/supabase-js";
import { useEffect } from "react";

type Props={
  user: User | null
}


const HeaderClient = ({ user }: Props) => {

  const router = useRouter()
  const { data, error } = useProfile()

  useEffect(() => {
    if (error) {
      router.replace('/login')
    }
  }, [error, router])

  const handleLogout = async () => {  
      await logout()
      window.location.href = "/auth/login";
  };

  return (
    <HeaderUI
      //data は最初 undefined
      profile={user ? data?.profile ?? null : null}
      profileImageUrl={user ? data?.userImage ?? null : null}
      onLogout={handleLogout}
    />
  );
};

export default HeaderClient;

"use client";

import { HeaderUI } from "./HeaderUI";
import type { Profile } from "@/types/data";
//import { useRouter } from "next/navigation";
import { logout } from "src/services/auth";


type Props = {
  profile: Profile | null;
  profileImageUrl: string | null | undefined;
};

const HeaderClient = ({ profile, profileImageUrl }: Props) => {

  //const router = useRouter()

  const handleLogout = async () => {  
      await logout()
      window.location.href = "/auth/login";
  };

  return (
    <HeaderUI
      profile={profile}
      profileImageUrl={profileImageUrl}
      onLogout={handleLogout}
    />
  );
};

export default HeaderClient;

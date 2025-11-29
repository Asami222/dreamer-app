"use client";

import { useSession, signOut } from "next-auth/react";
import { HeaderUI } from './HeaderUI'

const Header = () => {

  const { data: session } = useSession();

  return (
    <HeaderUI
      authUser={session?.user}
      onLogout={() => signOut({ callbackUrl: "/" })}
    />
  )
}

export default Header


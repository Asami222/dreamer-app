"use client";

import { useEffect, useState } from "react";
import { HeaderUI } from "./HeaderUI";
import { useSupabase } from "src/contexts/supabase";
import type { Profile } from "@/types/data";
import dynamic from "next/dynamic";


// HeaderのSkeleton（UIに近い形）
const HeaderSkeleton = dynamic(
  () => import("./HeaderSkeleton"),
  { ssr: false }
);

const Header = () => {
  const supabase = useSupabase();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
  
    const fetchProfile = async () => {
      const isE2E = process.env.NEXT_PUBLIC_E2E_TEST === "true";
  
      let user: { id: string } | null = null;
  
      if (isE2E) {
        user = { id: "test-user" };
      } else {
        const { data } = await supabase.auth.getSession();
        user = data.session?.user ?? null;
      }
  
      if (!user) {
        if (isMounted) {
          setProfile(null);
          setProfileImageUrl(null);
          setLoading(false);
        }
        return;
      }
  
      const res = await fetch("/api/profile", { cache: "no-store" });
      if (!res.ok) {
        if (isMounted) setLoading(false);
        return;
      }
  
      const data = await res.json();
      if (isMounted) {
        setProfile(data.profile);
        setProfileImageUrl(data.profileImageUrl);
        setLoading(false);
      }
    };
  
    fetchProfile();
  
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchProfile();
    });
  
    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = "/";
    } else {
      console.error("Logout error:", error.message);
    }
  };

  if (loading) return <HeaderSkeleton />;

  return (
    <HeaderUI
      profile={profile}
      profileImageUrl={profileImageUrl}
      onLogout={handleLogout}
    />
  );
};

export default Header;
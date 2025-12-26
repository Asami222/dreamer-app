"use client";

import { useState, useEffect } from "react";
import { useSupabase } from "src/contexts/supabase";
import type { User } from "@supabase/supabase-js";

export default function useUser() {
  const supabase = useSupabase();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  return user;
}
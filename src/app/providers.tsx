"use client"

import { useState, ReactNode } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseContext } from "src/contexts/supabase";
import GlobalSpinnerContextProvider from 'src/contexts/GlobalSpinnerContext'
import GlobalSpinner from 'src/components/organisms/GlobalSpinner'

export function Providers({ children }: { children: ReactNode }) {
  const [supabaseClient] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  return (
    <SupabaseContext.Provider value={supabaseClient}>
      <GlobalSpinnerContextProvider>
        <GlobalSpinner />
        {children}
      </GlobalSpinnerContextProvider>
    </SupabaseContext.Provider>
  )
}
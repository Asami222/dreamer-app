"use client"

import { SessionProvider } from "next-auth/react"
import GlobalSpinnerContextProvider from 'src/contexts/GlobalSpinnerContext'
import GlobalSpinner from 'src/components/organisms/GlobalSpinner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <GlobalSpinnerContextProvider>
        <GlobalSpinner />
        {children}
      </GlobalSpinnerContextProvider>
    </SessionProvider>
  )
}
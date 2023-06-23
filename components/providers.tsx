"use client"

import { GenerationProvider } from "@/contexts/generation"
import { ModalProvider } from "@/contexts/modal"
import { SessionProvider } from "next-auth/react"

import { Modals } from "@/components/modals/"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ModalProvider>
        <GenerationProvider>
          <Modals />

          {children}
        </GenerationProvider>
      </ModalProvider>
    </SessionProvider>
  )
}

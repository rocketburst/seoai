"use client"

import { GenerationProvider } from "@/contexts/generation"
import { ModalProvider } from "@/contexts/modal"
import { SessionProvider } from "next-auth/react"

import { SEOModal } from "@/components/seo-modal"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ModalProvider>
        <GenerationProvider>
          <SEOModal />
          {children}
        </GenerationProvider>
      </ModalProvider>
    </SessionProvider>
  )
}

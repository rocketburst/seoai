"use client"

import React, { createContext, useContext, useState } from "react"
import { ModalContextType, ModalType } from "@/types"

const ModalContext = createContext<ModalContextType | null>(null)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false)

  function changeModalVisibility(modal: ModalType) {
    switch (modal) {
      case "post":
        setIsPostModalOpen(!isPostModalOpen)
        break
      case "seo":
        setIsSeoModalOpen(!isSeoModalOpen)
        break
      case "api-key":
        setIsApiKeyModalOpen(!isApiKeyModalOpen)
        break
    }
  }

  function getModalState(modal: ModalType) {
    switch (modal) {
      case "seo":
        return isSeoModalOpen
      case "post":
        return isPostModalOpen
      case "api-key":
        return isApiKeyModalOpen
    }
  }

  return (
    <ModalContext.Provider value={{ changeModalVisibility, getModalState }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const { changeModalVisibility, getModalState } = useContext(
    ModalContext
  ) as ModalContextType

  return { changeModalVisibility, getModalState }
}

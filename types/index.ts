import { Dispatch, SetStateAction } from "react"
import { ApiKey } from "@prisma/client"

import { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export type NavLink = {
  title: string
  href: string
}

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type DocsConfig = {
  mainNav: NavItem[]
  sidebarNav: SidebarNavItem[]
}

export type ModalType = "seo" | "post" | "api-key"

export type ModalContextType = {
  changeModalVisibility: (modal: ModalType) => void
  getModalState: (modal: ModalType) => boolean
}

export type GenerationType = "seo" | "post"

export type SEOGeneration = {
  title: string
  description: string
  tags: string[]
}

export type PostGeneration = {
  file: File | null
  url: string
}

export type GenerationContextType = {
  getGeneration: (type: GenerationType) => SEOGeneration | PostGeneration
  setGeneration: (
    type: GenerationType,
    content: SEOGeneration | PostGeneration
  ) => void
}

export type Mode = "create" | "edit"

export type ApiKeyRes = {
  success: string | null
  error: string | null
  key: ApiKey | null
}

export type ApiKeyContextType = {
  isFetching: boolean
  setIsFetching: Dispatch<SetStateAction<boolean>>
  mode: Mode
  setMode: Dispatch<SetStateAction<Mode>>
  createApiKey: (name: string) => Promise<void>
  editApiKey: (name: string) => Promise<void>
  revokeApiKey: () => Promise<void>
}

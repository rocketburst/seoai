import { Icons } from "@/components/icons"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon: keyof typeof Icons
  href: string
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

export type ApiKeyContextType = {
  isCreating: boolean
  setIsCreating: Dispatch<SetStateAction<boolean>>
  createApiKey: (name: string) => Promise<void>
}

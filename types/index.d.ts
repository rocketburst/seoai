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

export type ModalType = "seo" | "post"

export type ModalContextType = {
  changeModalVisibility: (modal: ModalType) => void
  getModalState: (modal: ModalType) => boolean
}

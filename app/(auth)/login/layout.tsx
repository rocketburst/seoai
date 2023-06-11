import { SiteHeader } from "@/components/site-header"

interface LoginLayoutProps {
  children: React.ReactNode
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  )
}

import { SiteHeader } from "@/components/site-header"

interface LoginLayoutProps {
  children: React.ReactNode
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <SiteHeader />
      {children}
    </>
  )
}

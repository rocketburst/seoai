import { SiteHeader } from "@/components/site-header"

interface LandingLayoutProps {
  children: React.ReactNode
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  )
}

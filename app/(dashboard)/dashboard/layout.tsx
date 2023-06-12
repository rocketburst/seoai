import { SiteHeader } from "@/components/site-header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  )
}

import { SiteHeader } from "@/components/site-header"

interface LandingLayoutProps {
  children: React.ReactNode
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* @ts-expect-error Server Component */}
      <SiteHeader />
      <main className="flex-1">{children}</main>
    </div>
  )
}

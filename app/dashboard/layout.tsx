import { notFound } from "next/navigation"

import { dashboardNav } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { DashboardNav } from "@/components/dashboard-nav"
import { SiteHeader } from "@/components/site-header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()
  if (!user) return notFound()

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      {/* @ts-expect-error Server Component */}
      <SiteHeader />

      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardNav} />
        </aside>

        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}

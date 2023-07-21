import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProfileForm } from "@/components/forms/profile-form"
import { DashboardShell } from "@/components/shell"

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) redirect(authOptions?.pages?.signIn || "/login")

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Profile"
        text="Edit your profile information here."
      />

      <section className="grid gap-10 pb-44 md:pb-0">
        <ProfileForm user={user} />
      </section>
    </DashboardShell>
  )
}

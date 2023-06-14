import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProfileForm } from "@/components/profile-form"
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

      <section className="grid gap-10">
        <ProfileForm
          user={{
            id: user.id,
            name: user.name || "",
            email: user.email || "",
          }}
        />
      </section>
    </DashboardShell>
  )
}

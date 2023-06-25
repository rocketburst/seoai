import { User } from "@prisma/client"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/shell"

export default async function UsagePage() {
  const user = await getCurrentUser()
  const { remainingGens } = (await db.user.findUnique({
    where: { id: user?.id },
  })) as User

  return (
    <DashboardShell>
      <DashboardHeader
        heading="API Usage"
        text="Get your API key to use our API endpoint here."
      />
      Remaining Generations = {remainingGens}
    </DashboardShell>
  )
}

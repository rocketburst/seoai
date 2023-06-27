import { User } from "@prisma/client"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/dashboard-header"
import { KeysTable, columns } from "@/components/keys-table"
import { MobileKeysTable } from "@/components/mobile-keys-table"
import { DashboardShell } from "@/components/shell"
import { UsageAlert } from "@/components/usage-alert"

export default async function UsagePage() {
  const user = await getCurrentUser()
  const { remainingGens } = (await db.user.findUnique({
    where: { id: user?.id },
  })) as User
  const apiKeys = await db.apiKey.findMany({ where: { userId: user?.id } })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="API Usage"
        text="Get your API key to use our API endpoint here."
      />

      <div className="pb-10">
        <UsageAlert remaining={remainingGens} />
        <KeysTable columns={columns} data={apiKeys} />
        <MobileKeysTable data={apiKeys} />
      </div>
    </DashboardShell>
  )
}

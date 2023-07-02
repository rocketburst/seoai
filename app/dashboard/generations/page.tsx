import { notFound } from "next/navigation"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/shell"
import {
  GenerationsTable,
  columns,
} from "@/components/tables/generations-table"
import { MobileGenerationsTable } from "@/components/tables/mobile-generations-table"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) return notFound()

  const generations = await db.generation.findMany({
    where: { userId: user.id },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Previous Generations"
        text="See all of your previous generations here."
      />

      <GenerationsTable columns={columns} data={generations} />
      <MobileGenerationsTable data={generations} />
    </DashboardShell>
  )
}

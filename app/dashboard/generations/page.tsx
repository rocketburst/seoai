import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/shell"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Generations"
        text="See all of your previous generations here."
      />
      previous generations page
    </DashboardShell>
  )
}

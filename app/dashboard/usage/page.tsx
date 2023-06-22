import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/shell"

export default function UsagePage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="API Usage"
        text="Get your API key to use our API endpoint here."
      />
    </DashboardShell>
  )
}

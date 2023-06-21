import { DashboardHeader } from "@/components/dashboard-header"
import { GenerationCard } from "@/components/generation-card"
import { DashboardShell } from "@/components/shell"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Generate"
        text="Generate a new blog post or SEO for an existing post."
      />

      <GenerationCard className="pb-10" />
    </DashboardShell>
  )
}

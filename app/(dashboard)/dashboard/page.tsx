import { DashboardHeader } from "@/components/dashboard-header"
import { GenerationForm } from "@/components/generation-form"
import { DashboardShell } from "@/components/shell"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Generate"
        text="Generate a new blog post or SEO for an existing post."
      />

      <GenerationForm className="flex items-start space-y-10 lg:space-y-0 lg:space-x-10 flex-col lg:flex-row lg:items-center pb-10" />
    </DashboardShell>
  )
}

"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface UsageAlertProps {
  remaining: number
}

export function UsageAlert({ remaining }: UsageAlertProps) {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div>
        <Alert variant={remaining < 5 ? "destructive" : "default"}>
          <Icons.alert className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You have {remaining} requests for next 30 days.
          </AlertDescription>
        </Alert>
      </div>

      <div>
        <Button variant="outline">Create Key</Button>
      </div>
    </div>
  )
}

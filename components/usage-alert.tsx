"use client"

import { useApiKey } from "@/contexts/api-key"
import { useModal } from "@/contexts/modal"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface UsageAlertProps {
  remaining: number
}

export function UsageAlert({ remaining }: UsageAlertProps) {
  const { changeModalVisibility } = useModal()
  const { isFetching, setMode } = useApiKey()

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="max-w-[250px] sm:max-w-sm">
        <Alert variant={remaining < 5 ? "destructive" : "default"}>
          <Icons.alert className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You have {remaining} requests for next 30 days.
          </AlertDescription>
        </Alert>
      </div>

      <div>
        <Button
          variant="outline"
          onClick={() => {
            setMode("create")
            changeModalVisibility("api-key")
          }}
          disabled={isFetching}
        >
          {isFetching && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isFetching ? "Creating" : "Create"} Key
        </Button>
      </div>
    </div>
  )
}

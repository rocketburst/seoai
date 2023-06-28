"use client"

import { createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { ApiKeyContextType, ApiKeyRes, Mode } from "@/types"

import { toast } from "@/components/ui/use-toast"

const ApiKeyContext = createContext<ApiKeyContextType | null>(null)

export function ApiKeyProvider({ children }: { children: React.ReactNode }) {
  const [isFetching, setIsFetching] = useState(false)
  const [mode, setMode] = useState<Mode>("create")
  const router = useRouter()

  async function createApiKey(name: string) {
    const { error } = await fetch("/api/api-key", {
      method: "POST",
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((data) => data as ApiKeyRes)

    setIsFetching(false)

    if (error)
      toast({
        title: "Something went wrong",
        description: error,
        variant: "destructive",
      })
    else
      toast({
        title: "Successfully Created",
        description: `Successfully created API key named ${name}`,
      })

    router.refresh()
  }

  async function editApiKey(name: string) {
    const { error } = await fetch("/api/api-key", {
      method: "PATCH",
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((data) => data as ApiKeyRes)

    setIsFetching(false)

    if (error)
      toast({
        title: "Something went wrong",
        description: error,
        variant: "destructive",
      })
    else
      toast({
        title: "Successfully Edited",
        description: `Successfully edited API key, now named ${name}`,
      })

    router.refresh()
  }

  async function revokeApiKey() {
    const { error } = await fetch("/api/api-key", {
      method: "PATCH",
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => data as ApiKeyRes)

    setIsFetching(false)

    if (error)
      toast({
        title: "Something went wrong",
        description: error,
        variant: "destructive",
      })
    else
      toast({
        title: "Successfully Revoked",
        description: `Successfully revoked API Key`,
      })

    router.refresh()
  }

  return (
    <ApiKeyContext.Provider
      value={{
        isFetching,
        setIsFetching,
        createApiKey,
        mode,
        setMode,
        editApiKey,
        revokeApiKey,
      }}
    >
      {children}
    </ApiKeyContext.Provider>
  )
}

export function useApiKey() {
  const {
    isFetching,
    setIsFetching,
    createApiKey,
    mode,
    setMode,
    editApiKey,
    revokeApiKey,
  } = useContext(ApiKeyContext) as ApiKeyContextType

  return {
    isFetching,
    setIsFetching,
    createApiKey,
    mode,
    setMode,
    editApiKey,
    revokeApiKey,
  }
}

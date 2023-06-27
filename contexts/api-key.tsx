import { createContext, useContext, useState } from "react"
import { ApiKeyContextType } from "@/types"

const ApiKeyContext = createContext<ApiKeyContextType | null>(null)

export function ApiKeyProvider({ children }: { children: React.ReactNode }) {
  const [isCreating, setIsCreating] = useState(false)

  async function createApiKey(name: string) {}

  return (
    <ApiKeyContext.Provider value={{ isCreating, setIsCreating, createApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  )
}

export function useApiKey() {
  const { isCreating, setIsCreating, createApiKey } = useContext(
    ApiKeyContext
  ) as ApiKeyContextType

  return { isCreating, setIsCreating, createApiKey }
}

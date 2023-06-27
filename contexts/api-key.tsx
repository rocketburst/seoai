import { createContext, useContext, useState } from "react"
import { ApiKeyContextType, Mode } from "@/types"

const ApiKeyContext = createContext<ApiKeyContextType | null>(null)

export function ApiKeyProvider({ children }: { children: React.ReactNode }) {
  const [isFetching, setIsFetching] = useState(false)
  const [mode, setMode] = useState<Mode>("create")

  async function createApiKey(name: string) {}

  async function editApiKey(name: string) {}

  return (
    <ApiKeyContext.Provider
      value={{
        isFetching,
        setIsFetching,
        createApiKey,
        mode,
        setMode,
        editApiKey,
      }}
    >
      {children}
    </ApiKeyContext.Provider>
  )
}

export function useApiKey() {
  const { isFetching, setIsFetching, createApiKey, mode, setMode, editApiKey } =
    useContext(ApiKeyContext) as ApiKeyContextType

  return { isFetching, setIsFetching, createApiKey, mode, setMode, editApiKey }
}

import { createContext, useContext, useState } from "react"
import {
  GenerationContextType,
  GenerationType,
  PostGeneration,
  SEOGeneration,
} from "@/types"

const GenerationContext = createContext<GenerationContextType | null>(null)

export function GenerationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [seoGen, setSeoGen] = useState<SEOGeneration>({
    title: "",
    description: "",
    tags: [],
  })
  const [postGen, setPostGen] = useState<PostGeneration>({
    file: null,
    url: "",
  })

  function getGeneration(type: GenerationType) {
    switch (type) {
      case "seo":
        return seoGen
      case "post":
        return postGen
    }
  }

  function setGeneration(
    type: GenerationType,
    content: SEOGeneration | PostGeneration
  ) {
    switch (type) {
      case "seo":
        setSeoGen(content as SEOGeneration)
        break
      case "post":
        setPostGen(content as PostGeneration)
        break
    }
  }

  return (
    <GenerationContext.Provider value={{ getGeneration, setGeneration }}>
      {children}
    </GenerationContext.Provider>
  )
}

export function useGeneration() {
  const { getGeneration, setGeneration } = useContext(
    GenerationContext
  ) as GenerationContextType

  return { getGeneration, setGeneration }
}

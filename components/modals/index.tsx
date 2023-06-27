import { ApiKeyModal } from "@/components/modals/api-key-modal"
import { PostModal } from "@/components/modals/post-modal"
import { SEOModal } from "@/components/modals/seo-modal"

export function Modals() {
  return (
    <>
      <SEOModal />
      <PostModal />
      <ApiKeyModal />
    </>
  )
}

"use client"

import { useGeneration } from "@/contexts/generation"
import { useModal } from "@/contexts/modal"
import { SEOGeneration } from "@/types"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function SEOModal() {
  const { changeModalVisibility, getModalState } = useModal()
  const { getGeneration } = useGeneration()
  const { title, description, tags } = getGeneration("seo") as SEOGeneration

  return (
    <Dialog open={getModalState("seo")} defaultOpen={false}>
      <DialogContent
        className="sm:max-w-[425px]"
        onEscapeKeyDown={() => changeModalVisibility("seo")}
        onPointerDownOutside={() => changeModalVisibility("seo")}
        onInteractOutside={() => changeModalVisibility("seo")}
      >
        <DialogHeader>
          <DialogTitle>AI-Generated SEO</DialogTitle>
          <DialogDescription>
            The SEO optimized fields for your blog post!
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <p>The SEO optimized title is: {title}</p>
          <p>The SEO optimized description is: {description}</p>
          <p>The SEO optimized tags are: {tags.map((tag) => `${tag}, `)}</p>
        </div>

        <DialogFooter>
          <Button onClick={() => changeModalVisibility("seo")}>
            OK, Thanks!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

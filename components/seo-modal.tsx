"use client"

import { useModal } from "@/contexts/modal"

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

        <div className="grid gap-4 py-4"></div>

        <DialogFooter>
          <Button onClick={() => changeModalVisibility("seo")}>
            OK, Thanks!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

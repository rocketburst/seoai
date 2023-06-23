"use client"

import Link from "next/link"
import { useGeneration } from "@/contexts/generation"
import { useModal } from "@/contexts/modal"
import { PostGeneration } from "@/types"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function PostModal() {
  const { changeModalVisibility, getModalState } = useModal()
  const { getGeneration } = useGeneration()
  const { url } = getGeneration("post") as PostGeneration

  return (
    <Dialog open={getModalState("post")} defaultOpen={false}>
      <DialogContent
        className="sm:max-w-[425px]"
        onEscapeKeyDown={() => changeModalVisibility("post")}
        onPointerDownOutside={() => changeModalVisibility("post")}
        onInteractOutside={() => changeModalVisibility("post")}
      >
        <DialogHeader>
          <DialogTitle>AI-Generated Post</DialogTitle>
          <DialogDescription>Here is your new blog post </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <p>
            <Link href={url} target="_blank" download>
              Click <span className="underline">here</span> to download it.
            </Link>
          </p>
        </div>

        <DialogFooter>
          <Button onClick={() => changeModalVisibility("post")}>
            OK, Thanks!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

import { MouseEvent, useRef } from "react"
import { useApiKey } from "@/contexts/api-key"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ApiKeyModal() {
  const { changeModalVisibility, getModalState } = useModal()
  const { createApiKey, setIsCreating } = useApiKey()
  const nameRef = useRef<HTMLInputElement>(null)

  async function onClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault()
    const name = nameRef.current?.value
    if (!name) return

    changeModalVisibility("api-key")
    setIsCreating(true)

    await createApiKey(name)
  }

  return (
    <Dialog open={getModalState("api-key")} defaultOpen={false}>
      <DialogContent
        className="sm:max-w-[425px]"
        onEscapeKeyDown={() => changeModalVisibility("api-key")}
        onPointerDownOutside={() => changeModalVisibility("api-key")}
        onInteractOutside={() => changeModalVisibility("api-key")}
      >
        <DialogHeader>
          <DialogTitle>Create API Key</DialogTitle>
          <DialogDescription>
            Enter the name of your API Key. Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <Label htmlFor="name" className="sr-only">
            Name
          </Label>
          <Input id="name" placeholder="API Key" ref={nameRef} />
        </div>

        <DialogFooter>
          <Button onClick={onClick}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

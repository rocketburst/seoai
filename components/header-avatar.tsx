"use client"

import { signOut } from "next-auth/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface HeaderAvatarProps {
  img?: string
  name?: string
}

export function HeaderAvatar({ img, name }: HeaderAvatarProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar>
            <AvatarImage src={img} />
            <AvatarFallback>{name ? "" : "JD"}</AvatarFallback>
          </Avatar>
        </TooltipTrigger>

        <TooltipContent onClick={() => signOut()}>
          <p>Sign Out</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

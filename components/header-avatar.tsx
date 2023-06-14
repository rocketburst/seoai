"use client"

import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

import { getInitials } from "@/lib/utils"
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
  const router = useRouter()

  return (
    <div onClick={() => router.push("/dashboard/profile")}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar>
              <AvatarImage src={img} />
              <AvatarFallback>{name ? getInitials(name) : "JD"}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>

          <TooltipContent onClick={() => signOut()}>
            <p>Sign Out</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

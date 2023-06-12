"use client"

import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

interface MobileMenuProps {
  user:
    | ({
        id: string
      } & {
        name?: string | null | undefined
        email?: string | null | undefined
        image?: string | null | undefined
      })
    | undefined
}

export function MobileMenu({ user }: MobileMenuProps) {
  const { setTheme, theme } = useTheme()

  return (
    <div className="md:hidden flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icons.menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>{user ? "Sign Out" : "Sign In"}</DropdownMenuItem>
          {/* TODO: add source code later */}
          <DropdownMenuItem>View Source</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Change Theme
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

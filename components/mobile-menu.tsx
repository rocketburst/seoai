"use client"

import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

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
        <DropdownMenuTrigger asChild>
          <Icons.menu />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 mr-3">
          <DropdownMenuLabel>
            {user ? user.email : "My Account"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {user && (
            <>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Icons.user className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Icons.generate className="mr-2 h-4 w-4" />
                  <span>Generate</span>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Icons.api className="mr-2 h-4 w-4" />
                  <span>API Usage</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Icons.sun classname="mr-2 h-4 w-4" />
            ) : (
              <Icons.moon className="mr-2 h-4 w-4" />
            )}
            <span>Change Theme</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Icons.gitHub className="mr-2 h-4 w-4" />
            <span>Source Code</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            {user ? (
              <>
                <Icons.logOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </>
            ) : (
              <>
                <Icons.logIn className="mr-2 h-4 w-4" />
                <span>Sign In</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

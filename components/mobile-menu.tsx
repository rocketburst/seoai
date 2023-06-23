"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"
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
    <div className="flex items-center justify-center md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Icons.menu />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mr-3 w-56">
          <DropdownMenuLabel>
            {user ? user.email : "My Account"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {user && (
            <>
              <DropdownMenuGroup>
                <Link href="/dashboard/profile">
                  <DropdownMenuItem>
                    <Icons.user className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>

                <Link href="/dashboard">
                  <DropdownMenuItem>
                    <Icons.generate className="mr-2 h-4 w-4" />
                    <span>Generate</span>
                  </DropdownMenuItem>
                </Link>

                <Link href="/usage">
                  <DropdownMenuItem>
                    <Icons.api className="mr-2 h-4 w-4" />
                    <span>API Usage</span>
                  </DropdownMenuItem>
                </Link>
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

          <Link
            href="https://github.com/rocketburst/seoai"
            rel="noreferrer"
            target="_blank"
          >
            <DropdownMenuItem>
              <Icons.gitHub className="mr-2 h-4 w-4" />
              <span>Source Code</span>
            </DropdownMenuItem>
          </Link>

          {user ? (
            <DropdownMenuItem onClick={() => signOut()}>
              <Icons.logOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          ) : (
            <Link href="/login">
              <DropdownMenuItem>
                <Icons.logIn className="mr-2 h-4 w-4" />
                <span>Sign In</span>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

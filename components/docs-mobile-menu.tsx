"use client"

import Link from "next/link"
import { SidebarNavItem } from "@/types"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HeaderAvatar } from "@/components/header-avatar"
import { Icons } from "@/components/icons"

interface DocsMobileMenuProps {
  user:
    | ({
        id: string
      } & {
        name?: string | null | undefined
        email?: string | null | undefined
        image?: string | null | undefined
      })
    | undefined
  items: SidebarNavItem[]
}

export function DocsMobileMenu({ user, items }: DocsMobileMenuProps) {
  return (
    <div className="flex items-center justify-center space-x-3 md:hidden">
      {user ? (
        <div
          className={cn(
            buttonVariants({
              size: "sm",
              variant: "ghost",
            }),
            "cursor-pointer hover:bg-inherit"
          )}
        >
          <HeaderAvatar img={user.image as string} name={user.name as string} />
        </div>
      ) : (
        <Link href="/login">
          <div
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
            })}
          >
            Login
          </div>
        </Link>
      )}

      <Sheet>
        <SheetTrigger asChild>
          <Icons.menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">
              Docs Table of Contents
            </SheetTitle>
            <SheetDescription className="sr-only">
              Table of contents for documentation.
            </SheetDescription>

            <hr className="pb-4" />

            {items.map((item, index) => (
              <div key={index} className="">
                <p className="text-md flex w-full items-center rounded-md p-1 text-left font-medium">
                  {item.title}
                </p>
                <ul>
                  {item.items?.map(({ title, href }, index) => (
                    <li key={index}>
                      <Link
                        href={href}
                        className={cn(
                          "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                          item.disabled && "cursor-not-allowed opacity-60"
                        )}
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}

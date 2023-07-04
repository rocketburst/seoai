"use client"

import Link from "next/link"
import { SidebarNavItem } from "@/types"

import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Icons } from "@/components/icons"

interface DocsMobileMenuProps {
  items: SidebarNavItem[]
}

export function DocsMobileMenu({ items }: DocsMobileMenuProps) {
  return (
    <div className="flex items-center justify-center space-x-3 md:hidden">
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

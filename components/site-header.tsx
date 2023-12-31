import Link from "next/link"

import { siteConfig } from "@/config/site"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { HeaderAvatar } from "@/components/header-avatar"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileMenu } from "@/components/mobile-menu"
import { ThemeToggle } from "@/components/theme-toggle"

export async function SiteHeader() {
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden items-center space-x-1 md:flex">
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
                <HeaderAvatar
                  img={user.image as string}
                  name={user.name as string}
                />
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

            <Link
              href="https://github.com/rocketburst/seoai"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>

            <ThemeToggle />
          </nav>

          <MobileMenu user={user} />
        </div>
      </div>
    </header>
  )
}

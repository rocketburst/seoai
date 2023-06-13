import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-y-hidden">
      <section className="space-y-6 -mt-40 md:-mt-36">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading">
            SEO: Made Simple, Done Right.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Maximize views on your blog with GPT-4. Right Here. Right Now.
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href="/docs"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "cursor-pointer"
              )}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

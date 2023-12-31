"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostForm } from "@/components/forms/post-form"
import { SEOForm } from "@/components/forms/seo-form"

interface GenerationFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function GenerationCard({ className, ...props }: GenerationFormProps) {
  const router = useRouter()

  return (
    <section className={className} {...props}>
      <Tabs defaultValue="seo" className="max-w-[460px] lg:max-w-3xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="seo">New SEO</TabsTrigger>
          <TabsTrigger value="post">New Post</TabsTrigger>
        </TabsList>

        <TabsContent
          value="seo"
          className="flex flex-col space-y-5 lg:flex-row lg:space-x-10 lg:space-y-0"
        >
          <SEOForm />
        </TabsContent>

        <TabsContent value="post">
          <PostForm />
        </TabsContent>
      </Tabs>

      <Button
        variant="link"
        className="-ml-3 mt-3"
        onClick={() => router.push("/dashboard/generations")}
      >
        See all previous generations
      </Button>
    </section>
  )
}

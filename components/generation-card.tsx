"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostForm } from "@/components/post-form"
import { SEOForm } from "@/components/seo-form"

interface GenerationFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function GenerationCard({ className, ...props }: GenerationFormProps) {
  return (
    <section className={className} {...props}>
      <Tabs defaultValue="seo" className="max-w-[460px] lg:max-w-3xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="seo">New SEO</TabsTrigger>
          <TabsTrigger value="post">New Post</TabsTrigger>
        </TabsList>

        <TabsContent
          value="seo"
          className="space-y-5 flex flex-col lg:space-y-0 lg:flex-row lg:space-x-10"
        >
          <SEOForm />
        </TabsContent>

        <TabsContent value="post">
          <PostForm />
        </TabsContent>
      </Tabs>
    </section>
  )
}

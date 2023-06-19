"use client"

import { useState } from "react"
import { useModal } from "@/contexts/modal"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"

interface GenerationFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const seoFormSchema = z.object({
  post: z.string().min(20, {
    message: "Post must be at least 20 characters",
  }),
})

type SeoFormData = z.infer<typeof seoFormSchema>

export function GenerationForm({ className, ...props }: GenerationFormProps) {
  const [isSeoLoading, setIsSeoLoading] = useState(false)
  const { changeModalVisibility } = useModal()

  const seoForm = useForm<SeoFormData>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: { post: "" },
  })

  const message = `
    Here are the SEO specifications you wanted:

  Title: How to Build a Modal Using Tailwind CSS and Headless UI Library
  Description: Learn how to create and use modals in web applications using Tailwind CSS and Headless UI library. Follow our step-by-step guide to build your own modal and improve your web app's user experience.
  Tags: Tailwind CSS, Headless UI, modals, web applications, user experience, web development, front-end development`

  async function onSeoFormSubmit({ post }: SeoFormData) {
    setIsSeoLoading(true)

    // const { message }: { message: string } = await fetch("/api/generate/seo", {
    //   method: "POST",
    //   body: JSON.stringify({ post }),
    // }).then((res) => res.json())
    // console.log(message)

    setTimeout(() => {
      setIsSeoLoading(false)
      changeModalVisibility("seo")
    }, 2000)
  }

  return (
    <section className={className} {...props}>
      <Tabs defaultValue="seo" className="max-w-[460px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="seo">New SEO</TabsTrigger>
          <TabsTrigger value="post">New Post</TabsTrigger>
        </TabsList>

        <TabsContent value="seo">
          <form onSubmit={seoForm.handleSubmit(onSeoFormSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Generate New SEO for Post</CardTitle>
                <CardDescription>
                  Paste your post content here, then click generate to create
                  SEO optimized tags for your blog post.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <Textarea
                  placeholder="Paste post content as markdown here."
                  id="post"
                  disabled={isSeoLoading}
                  {...seoForm.register("post")}
                />

                {seoForm.formState.errors?.post && (
                  <p className="px-1 text-xs text-red-600">
                    {seoForm.formState.errors.post.message}
                  </p>
                )}
              </CardContent>

              <CardFooter>
                <Button type="submit" disabled={isSeoLoading}>
                  {isSeoLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Generate
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="post">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Post</CardTitle>
              <CardDescription>
                Fill in the fields regarding the the post. After generating, a
                markdown file will be downloaded.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name of the Post</Label>
                <Input id="name" type="text" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="description">Description of the Post</Label>
                <Textarea id="description" />
              </div>
            </CardContent>

            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle>Upload Post</CardTitle>
          <CardDescription>
            Upload your post as a markdown file here instead of pasting it.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <Input id="file" type="file" />
        </CardContent>

        <CardFooter>
          <Button>Upload</Button>
        </CardFooter>
      </Card>
    </section>
  )
}

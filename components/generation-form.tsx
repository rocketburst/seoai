"use client"

import { MouseEvent, useState } from "react"
import { useGeneration } from "@/contexts/generation"
import { useModal } from "@/contexts/modal"
import { SEOGeneration } from "@/types"
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
import { toast } from "@/components/ui/use-toast"
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
  const [file, setFile] = useState<File | null>(null)
  const { changeModalVisibility } = useModal()
  const { setGeneration } = useGeneration()
  const reader = new FileReader()

  const seoForm = useForm<SeoFormData>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: { post: "" },
  })

  const message = `
    { "title": "How to Build a Modal Using Tailwind CSS and Headless UI | Tutorial", "description": "Learn how to build a custom modal using Tailwind CSS and Headless UI, with easy-to-follow code snippets and step-by-step instructions. Improve accessibility and user experience on your web applications today!", "tags": ["Tailwind CSS", "Headless UI", "Modal", "Web Development", "Tutorial"] }`

  async function onSeoFormSubmit({ post }: SeoFormData) {
    setIsSeoLoading(true)

    // TODO: uncomment in prod
    // const { message }: { message: string } = await fetch("/api/generate/seo", {
    //   method: "POST",
    //   body: JSON.stringify({ post }),
    // }).then((res) => res.json())

    setIsSeoLoading(false)

    try {
      const generation = JSON.parse(message) as SEOGeneration
      setGeneration("seo", generation)
      changeModalVisibility("seo")
    } catch (error) {
      return toast({
        title: "Something went wrong.",
        description: "Your generation failed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setFile(null)
    }
  }

  function onFileUpload(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault()

    if (!file || file.name.split(".")[1] !== "mdx") {
      return toast({
        title: "Something went wrong.",
        description: "Invalid file. Please try again.",
        variant: "destructive",
      })
    }

    reader.readAsText(file)
    reader.onload = (e) => {
      const content = e.target?.result as string
      onSeoFormSubmit({ post: content })
    }
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
            Upload your post as a markdown file here instead of pasting it to
            generate the SEO.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <Input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files![0])}
          />
        </CardContent>

        <CardFooter>
          <Button onClick={onFileUpload}>Generate</Button>
        </CardFooter>
      </Card>
    </section>
  )
}

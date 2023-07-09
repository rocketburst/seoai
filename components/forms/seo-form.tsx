"use client"

import { MouseEvent, useState } from "react"
import { useGeneration } from "@/contexts/generation"
import { useModal } from "@/contexts/modal"
import { ApiKeyRes, SEOGeneration } from "@/types"
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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const seoFormSchema = z.object({
  post: z.string().min(20, {
    message: "Post must be at least 20 characters",
  }),
})

type SeoFormData = z.infer<typeof seoFormSchema>

export function SEOForm() {
  const [isSeoLoading, setIsSeoLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const { changeModalVisibility } = useModal()
  const { setGeneration } = useGeneration()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SeoFormData>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: { post: "" },
  })

  const message = `
    { "title": "How to Build a Modal Using Tailwind CSS and Headless UI | Tutorial", "description": "Learn how to build a custom modal using Tailwind CSS and Headless UI, with easy-to-follow code snippets and step-by-step instructions. Improve accessibility and user experience on your web applications today!", "tags": ["Tailwind CSS", "Headless UI", "Modal", "Web Development", "Tutorial"] }`

  async function onSubmit({ post }: SeoFormData) {
    setIsSeoLoading(true)

    const { key } = await fetch("/api/api-key")
      .then((res) => res.json())
      .then((data) => data as ApiKeyRes)

    if (!key) {
      setIsSeoLoading(false)
      return toast({
        title: "Something went wrong.",
        description: "Your API Key is not valid. Please try again.",
        variant: "destructive",
      })
    }

    const { message }: { message: string } = await fetch("/api/generate/seo", {
      method: "POST",
      body: JSON.stringify({ post }),
      headers: {
        Authorization: `Bearer ${key.key}`,
      },
    }).then((res) => res.json())

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

    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (e) => {
      const content = e.target?.result as string
      onSubmit({ post: content })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Generate New SEO for Post</CardTitle>
            <CardDescription>
              Paste your post content here, then click generate to create SEO
              optimized tags for your blog post.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <Textarea
              placeholder="Paste post content as markdown here."
              id="post"
              disabled={isSeoLoading}
              {...register("post")}
            />

            {errors?.post && (
              <p className="px-1 text-xs text-red-600">{errors.post.message}</p>
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
    </>
  )
}

"use client"

import { MouseEvent, useRef, useState } from "react"
import { useGeneration } from "@/contexts/generation"
import { useModal } from "@/contexts/modal"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const postFormSchema = z.object({
  name: z.string().min(2, {
    message: "Must have name",
  }),
  description: z.string().min(20, {
    message: "Must have description",
  }),
  readTime: z.number(),
})

type FormData = z.infer<typeof postFormSchema>

export function PostForm() {
  const tagInputRef = useRef<HTMLInputElement>(null)
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const { setGeneration } = useGeneration()
  const { changeModalVisibility } = useModal()
  const { data: session } = useSession()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: { name: "", description: "", readTime: 5 },
  })

  async function onSubmit({ name, description, readTime }: FormData) {
    setLoading(true)
    tagInputRef.current!.value = ""

    // const message =
    //   "In the above example, the execution context for the `add` function is created when it is called with arguments `10` and `20`. Inside the function, a new variable `result` is declared which is available in the function execution context."

    try {
      // TODO: uncomment in prod
      const { message }: { message: string } = await fetch(
        `/api/generate/post?id=${session?.user.id}`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
            description,
            readTime,
            tags,
          }),
        }
      ).then((res) => res.json())

      const file = new File([message], "post", { type: "text/plain" })
      const url = URL.createObjectURL(file)
      setGeneration("post", { file, url })
      changeModalVisibility("post")
    } catch (error) {
      return toast({
        title: "Something went wrong.",
        description: "Your generation failed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setTags([])
    }
  }

  function addTag(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    if (!tagInputRef.current?.value) return
    e.preventDefault()
    setTags([...tags, tagInputRef.current?.value as string])
    tagInputRef.current!.value = ""
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate New Post</CardTitle>
        <CardDescription>
          Fill in the fields regarding the the post. After generating, a
          markdown file will be downloaded.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name of the Post</Label>
            <Input
              id="name"
              type="text"
              disabled={loading}
              {...register("name")}
            />

            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description of the Post</Label>
            <Textarea
              id="description"
              disabled={loading}
              {...register("description")}
            />

            {errors?.description && (
              <p className="px-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="name">Read Time</Label>
            <Input
              id="name"
              type="number"
              disabled={loading}
              {...register("readTime")}
            />

            {errors?.readTime && (
              <p className="px-1 text-xs text-red-600">
                {errors.readTime.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="name">Tags</Label>

            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder=""
                disabled={loading}
                ref={tagInputRef}
              />

              <Button
                type="submit"
                variant="ghost"
                onClick={addTag}
                disabled={loading}
              >
                Add
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            <ul className="flex items-center space-x-1 text-xs">
              {tags.map((tag, i) => (
                <li key={i}>{`${tag}, `}</li>
              ))}
            </ul>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" disabled={loading}>
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Generate Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

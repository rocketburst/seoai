"use client"

import { MouseEvent, useRef, useState } from "react"
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
import { Textarea } from "@/components/ui/textarea"

const postFormSchema = z.object({
  name: z.string().min(2, {
    message: "Must have name",
  }),
  description: z.string().min(20, {
    message: "Must have description",
  }),
})

type FormData = z.infer<typeof postFormSchema>

export function PostForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: { name: "", description: "" },
  })

  const tagInputRef = useRef<HTMLInputElement>(null)
  const [tags, setTags] = useState<string[]>([])

  async function onSubmit(data: FormData) {}

  function addTag(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    if (!tagInputRef.current?.value) return
    e.preventDefault()
    setTags([...tags, tagInputRef.current?.value as string])
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
            <Input id="name" type="text" {...register("name")} />

            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description of the Post</Label>
            <Textarea id="description" {...register("description")} />

            {errors?.description && (
              <p className="px-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="name">Tags</Label>

            <div className="flex w-full items-center space-x-2">
              <Input type="text" placeholder="" ref={tagInputRef} />

              <Button type="submit" variant="ghost" onClick={addTag}>
                Add
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            <ul className="text-xs flex items-center space-x-1">
              {tags.map((tag, i) => (
                <li key={i}>{`${tag}, `}</li>
              ))}
            </ul>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit">Generate Post</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { signOut } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { passwordFormSchema } from "@/lib/validations/profile"
import { buttonVariants } from "@/components/ui/button"
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
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

type FormData = z.infer<typeof passwordFormSchema>

interface PasswordFormProps {
  userId: string
}

export function PasswordForm({ userId }: PasswordFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      current: "",
      new: "",
    },
  })
  const [isSaving, setIsSaving] = useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPass: data.current, newPass: data.new }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your password was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your password has been updated.",
    })

    signOut()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password here. After saving, you&apos;ll be logged out.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="current">Current password</Label>
            <Input
              id="current"
              type="password"
              className="max-w-[400px]"
              {...register("current")}
            />

            {errors?.current && (
              <p className="px-1 text-xs text-red-600">
                {errors.current.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="new">New password</Label>
            <Input
              id="new"
              type="password"
              className="max-w-[400px]"
              {...register("new")}
            />

            {errors?.new && (
              <p className="px-1 text-xs text-red-600">{errors.new.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>{" "}
        </CardFooter>
      </Card>
    </form>
  )
}

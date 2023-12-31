"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountForm } from "@/components/forms/account-form"
import { PasswordForm } from "@/components/forms/password-form"

interface ProfileFormProps {
  user: {
    id: string
    name?: string | null | undefined
    email?: string | null | undefined
    image?: string | null | undefined
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  return (
    <section className="flex flex-col items-start space-y-10 pb-10 lg:flex-row lg:items-center lg:space-x-10 lg:space-y-0">
      <Tabs defaultValue="account" className="max-w-[500px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountForm
            user={{
              email: user.email as string,
              id: user.id,
              name: user.name as string,
            }}
          />
        </TabsContent>

        <TabsContent value="password">
          <PasswordForm userId={user.id} />
        </TabsContent>
      </Tabs>
    </section>
  )
}

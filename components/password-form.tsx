"use client"

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

export function PasswordForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. After saving, you'll be logged out.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="current">Current password</Label>
          <Input id="current" type="password" className="max-w-[400px]" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="new">New password</Label>
          <Input id="new" type="password" className="max-w-[400px]" />
        </div>
      </CardContent>

      <CardFooter>
        <Button>Save password</Button>
      </CardFooter>
    </Card>
  )
}

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
import { Textarea } from "@/components/ui/textarea"

export function PostForm() {
  return (
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

        <div className="space-y-1">
          <Label htmlFor="name">Character Limit</Label>
          <Input id="name" type="number" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="name">Tags</Label>
          <div className="flex w-full items-center space-x-2">
            <Input type="text" placeholder="" />
            <Button type="submit" variant="ghost">
              Add
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          <ul className="text-xs flex items-center space-x-1">
            <li>Tag, </li>
            <li>Tag, </li>
            <li>Tag, </li>
          </ul>
        </div>
      </CardContent>

      <CardFooter>
        <Button>Save password</Button>
      </CardFooter>
    </Card>
  )
}

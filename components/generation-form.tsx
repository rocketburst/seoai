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

interface GenerationFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function GenerationForm({ className, ...props }: GenerationFormProps) {
  return (
    <section className={className} {...props}>
      <Tabs defaultValue="seo" className="max-w-[460px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="seo">New SEO</TabsTrigger>
          <TabsTrigger value="post">New Post</TabsTrigger>
        </TabsList>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>Generate New SEO for Post</CardTitle>
              <CardDescription>
                Paste your post content here, then click generate to create SEO
                optimized meta tags
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <Textarea
                placeholder="Paste post content as markdown here."
                id="post"
              />
            </CardContent>

            <CardFooter>
              <Button>Generate</Button>
            </CardFooter>
          </Card>
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

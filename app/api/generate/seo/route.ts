import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"

import openai from "@/lib/openai"

export const seoRouteSchema = z.object({
  post: z.string().min(2),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { post } = seoRouteSchema.parse(body)

  const { data } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "When responding, always begin with Here are the SEO specifications you wanted. Use everything provided in the prompt to formulate your response.",
      },
      {
        role: "user",
        content: `Hi there, I would like an SEO optimized title, description, and some relavant SEO optimized tags for the following post that is written in markdown. Read the markdown post and use the post headings and content to formulate the response. The post is here: ${post}`,
      },
    ],
  })

  console.log("DATA IS: ", data)
  console.log(data.choices[0].message)

  return NextResponse.json({ message: data.choices[0].message })
}

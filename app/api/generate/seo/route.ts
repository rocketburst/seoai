import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"

import { db } from "@/lib/db"
import { openai } from "@/lib/openai"
import { getCurrentUser } from "@/lib/session"

export const seoRouteSchema = z.object({
  post: z.string().min(2),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { post } = seoRouteSchema.parse(body)
  const user = await getCurrentUser()

  const key = req.headers.get("Authorization")?.substring(7)
  if (!key) return NextResponse.json({ error: "No API key" }, { status: 400 })

  // TODO: get user auth some other way for outside fetching
  const remaining = Number(req.headers.get("x-remaining"))
  await db.user.update({
    where: { id: user?.id },
    data: { remainingGens: remaining },
  })

  const { data } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "When responding, use everything provided in the prompt to formulate your response. Respond with a JSON object with the SEO optimized title as a string, the SEO optimized description as a string, and the SEO optimized tags as an array of strings.",
      },
      {
        role: "user",
        content: `Hi there, I would like an SEO optimized title, description, and some relavant SEO optimized tags for the following post that is written in markdown. Read the markdown post and use the post headings and content to formulate the response. The post is here: ${post}`,
      },
    ],
  })

  console.log("DATA IS: ", data)
  console.log(data.choices[0].message)

  // return NextResponse.json({
  //   message: `
  //   { "title": "How to Build a Modal Using Tailwind CSS and Headless UI | Tutorial", "description": "Learn how to build a custom modal using Tailwind CSS and Headless UI, with easy-to-follow code snippets and step-by-step instructions. Improve accessibility and user experience on your web applications today!", "tags": ["Tailwind CSS", "Headless UI", "Modal", "Web Development", "Tutorial"] }`,
  // })
  return NextResponse.json({ message: data.choices[0].message?.content })
}

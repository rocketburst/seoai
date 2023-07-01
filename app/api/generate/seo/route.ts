import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"

import { db } from "@/lib/db"
import { openai } from "@/lib/openai"

export const seoRouteSchema = z.object({
  post: z.string().min(2),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { post } = seoRouteSchema.parse(body)

    const key = req.headers.get("Authorization")?.substring(7)
    if (!key)
      return NextResponse.json(
        { error: "No API key", message: null },
        { status: 400 }
      )

    const { userId } = await db.apiKey.findUniqueOrThrow({ where: { key } })

    // TODO: get user auth some other way for outside fetching
    const remaining = Number(req.headers.get("x-remaining"))
    await db.user.update({
      where: { id: userId },
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

    const message = data.choices[0].message?.content as string

    // const message = `
    //   { "title": "How to Build a Modal Using Tailwind CSS and Headless UI | Tutorial", "description": "Learn how to build a custom modal using Tailwind CSS and Headless UI, with easy-to-follow code snippets and step-by-step instructions. Improve accessibility and user experience on your web applications today!", "tags": ["Tailwind CSS", "Headless UI", "Modal", "Web Development", "Tutorial"] }`

    await db.generation.create({
      data: {
        content: message,
        type: "SEO",
        userId: userId,
      },
    })

    return NextResponse.json({ message, error: null }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(
        { error: error.issues, message: null },
        { status: 422 }
      )

    return NextResponse.json(
      { error: "Something went wrong", message: null },
      { status: 500 }
    )
  }
}

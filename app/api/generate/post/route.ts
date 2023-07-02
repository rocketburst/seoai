import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"

import { db } from "@/lib/db"
import { openai } from "@/lib/openai"

const postRouteSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  tags: z.array(z.string()).optional(),
  readTime: z.number(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, description, tags, readTime } = postRouteSchema.parse(body)

    const key = req.headers.get("Authorization")?.substring(7)
    if (!key)
      return NextResponse.json(
        { error: "No API key", message: null },
        { status: 400 }
      )
    const { userId } = await db.apiKey.findUniqueOrThrow({ where: { key } })

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
          content: `When responding, use everything provided in the prompt to formulate your response. Respond with a blog post written in markdown with proper headings and subheadings that can be read in about ${readTime} minutes. Don't make anything up while producing the response.`,
        },
        {
          role: "user",
          content: `Hi there, I want you to generate a blog post using the given fields. The title for the post will be ${name}. The description of the post will be ${description}. ${
            tags && `The post should be related to the following tags: ${tags}`
          } Make sure to include proper code snippets when available.`,
        },
      ],
    })

    console.log("DATA IS: ", data)
    console.log(data.choices[0].message)

    const message = data.choices[0].message?.content as string

    await db.generation.create({
      data: {
        content: message,
        type: "POST",
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

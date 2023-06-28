import { NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"
import * as z from "zod"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

const apiKeyRouteSchema = z.object({
  name: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    const body = await req.json()

    if (!user)
      return NextResponse.json(
        { error: "Unauthorized to perform this action", key: null },
        { status: 401 }
      )

    const existingKey = await db.apiKey.findFirst({
      where: { userId: user.id, enabled: true },
    })

    if (existingKey)
      return NextResponse.json(
        { error: "You already have a valid API key.", key: null },
        { status: 400 }
      )

    const { name } = apiKeyRouteSchema.parse(body)

    if (!name)
      return NextResponse.json(
        { error: "No name provided.", key: null },
        { status: 400 }
      )

    const key = await db.apiKey.create({
      data: {
        userId: user.id,
        key: nanoid(32),
        name,
      },
    })

    return NextResponse.json({ success: "Key Created!", key }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Please try again", key: null },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    const body = await req.json()

    if (!user)
      return NextResponse.json(
        { error: "Unauthorized to perform this action", key: null },
        { status: 401 }
      )

    const existingKey = await db.apiKey.findFirst({
      where: { userId: user.id, enabled: true },
    })

    if (!existingKey)
      return NextResponse.json(
        { error: "API Key name could not be edited.", key: null },
        { status: 500 }
      )

    const { name } = apiKeyRouteSchema.parse(body)

    if (name) {
      const key = await db.apiKey.update({
        where: { id: existingKey.id },
        data: { name },
      })
      console.log("s")

      return NextResponse.json(
        { success: "Key Updated!", key },
        { status: 200 }
      )
    } else {
      const key = await db.apiKey.update({
        where: { id: existingKey.id },
        data: { enabled: false },
      })

      return NextResponse.json(
        { success: "Key revoked.", key },
        { status: 200 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Please try again", key: null },
      { status: 500 }
    )
  }
}

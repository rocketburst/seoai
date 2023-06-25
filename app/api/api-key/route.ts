import { NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"
import * as z from "zod"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user)
      return NextResponse.json({
        error: "Unauthorized to perform this action.",
        createdKey: null,
      })

    const existingApiKey = await db.apiKey.findFirst({
      where: { userId: user.id, enabled: true },
    })

    if (existingApiKey)
      return NextResponse.json({
        error: "You already have a valid API key",
        createdKey: null,
      })

    const createdKey = await db.apiKey.create({
      data: {
        userId: user.id,
        key: nanoid(32),
      },
    })

    return NextResponse.json({ error: null, createdKey }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Something went wrong", createdKey: null },
        { status: 500 }
      )
    }
  }
}

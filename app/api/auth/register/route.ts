import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import * as z from "zod"

import { db } from "@/lib/db"

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password } = registerSchema.parse(body)
  const hashedPassword = await hash(password, 10)

  const dbUser = await db.user.findUnique({
    where: { email },
  })
  if (dbUser) return NextResponse.json({ error: "User already exists!" })

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  return NextResponse.json({ user })
}

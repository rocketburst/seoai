import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

const userRouteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().min(2),
})

export async function PATCH(
  req: NextRequest,
  ctx: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(ctx)

    const session = await getServerSession(authOptions)
    if (!session?.user || params.userId !== session?.user.id)
      return new NextResponse(null, { status: 403 })

    const body = await req.json()
    const { name, email } = userRouteSchema.parse(body)

    await db.user.update({
      where: { id: session.user.id },
      data: { name, email },
    })

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError)
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })

    return new NextResponse(null, { status: 500 })
  }
}

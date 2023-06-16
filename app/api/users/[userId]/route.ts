import { NextRequest, NextResponse } from "next/server"
import { compare, hash } from "bcryptjs"
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
  name: z.string().min(2).optional(),
  email: z.string().email().min(2).optional(),
  currentPass: z.string().min(2).optional(),
  newPass: z.string().min(2).optional(),
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

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) return new NextResponse(null, { status: 403 })

    const body = await req.json()
    const { name, email, currentPass, newPass } = userRouteSchema.parse(body)

    if (name && email) {
      await db.user.update({
        where: { id: session.user.id },
        data: { name, email },
      })
      return new NextResponse(null, { status: 200 })
    }

    if (currentPass && newPass) {
      console.log("h")

      const isCurrentPassValid = await compare(currentPass, user.password)
      if (!isCurrentPassValid)
        return new NextResponse("Password not valid", { status: 500 })

      const hashsedPass = await hash(newPass, 10)
      await db.user.update({
        where: { id: session.user.id },
        data: { password: hashsedPass },
      })

      return new NextResponse(null, { status: 200 })
    }

    return new NextResponse(null, { status: 500 })
  } catch (error) {
    if (error instanceof z.ZodError)
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })

    return new NextResponse(null, { status: 500 })
  }
}

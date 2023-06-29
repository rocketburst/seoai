import { NextResponse } from "next/server"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    const ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      analytics: true,
      limiter: Ratelimit.slidingWindow(15, "30d"),
    })

    if (req.nextUrl.pathname === "/")
      return NextResponse.redirect(new URL("/dashboard", req.url))

    if (req.nextUrl.pathname.startsWith("/api/generate")) {
      const ip = req.headers.get("x-forwarded-for") ?? ""
      const { success, remaining, reset } = await ratelimit.limit(ip)

      if (!success) {
        const now = Date.now()
        const retryAfter = Math.floor((reset - now) / 1000)

        return NextResponse.json(
          { error: "Too many requests" },
          {
            status: 429,
            headers: {
              ["retry-after"]: `${retryAfter}`,
            },
          }
        )
      }

      const newHeaders = new Headers(req.headers)
      newHeaders.set("x-remaining", `${remaining}`)
      return NextResponse.next({
        request: {
          headers: newHeaders,
        },
      })
    }

    if (isAuthPage) {
      if (isAuth) return NextResponse.redirect(new URL("/dashboard", req.url))
      return null
    } else {
      if (isAuth) return null
      else {
        let from = req.nextUrl.pathname
        if (req.nextUrl.search) from += req.nextUrl.search

        return NextResponse.redirect(
          new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
        )
      }
    }
  },
  {
    callbacks: {
      authorized: async () => true,
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/api/:path*"],
}

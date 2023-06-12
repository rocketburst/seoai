import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    if (req.nextUrl.pathname === "/")
      return NextResponse.redirect(new URL("/dashboard", req.url))

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
  matcher: ["/dashboard/:path*", "/login", "/register"],
}

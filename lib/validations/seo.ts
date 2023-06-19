import * as z from "zod"

export const seoRouteSchema = z.object({
  post: z.string().min(2),
})

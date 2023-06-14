import * as z from "zod"

export const profileFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().min(2),
})

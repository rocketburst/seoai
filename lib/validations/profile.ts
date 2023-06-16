import * as z from "zod"

export const accountFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().min(2),
})

export const passwordFormSchema = z.object({
  current: z.string().min(2),
  new: z.string().min(2),
})

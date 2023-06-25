import { env } from "@/env.mjs"
import { Configuration, OpenAIApi } from "openai"

const config = new Configuration({
  apiKey: env.OPENAI_API_KEY,
})

export const openai = new OpenAIApi(config)

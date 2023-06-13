import {
  Poppins as FontHeading,
  JetBrains_Mono as FontMono,
  Inter as FontSans,
} from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontHeading = FontHeading({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

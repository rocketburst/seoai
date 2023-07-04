import { env } from "process"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
  const words = name.split(" ")
  let initials = ""

  words.forEach((word) => {
    const initial = word.charAt(0).toUpperCase()
    initials += initial
  })

  return initials
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

import type { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  background?: "white" | "gray" | "blue"
  className?: string
}

export function Section({ children, background = "white", className = "" }: SectionProps) {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
  }

  return <section className={`py-16 ${backgrounds[background]} ${className}`}>{children}</section>
}

import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Users, MapPin } from "lucide-react"

export interface EventCardProps {
  id: string
  title: string
  type: string
  typeColor: string
  date: string
  location: string
  registeredCount: number
  imageSrc?: string
  imageAlt?: string
  gradient?: boolean
  gradientFrom?: string
  gradientTo?: string
  specialText?: string
}

export function EventCard({
  id,
  title,
  type,
  typeColor,
  date,
  location,
  registeredCount,
  imageSrc,
  imageAlt = "Event image",
  gradient = false,
  gradientFrom = "from-blue-500",
  gradientTo = "to-cyan-500",
  specialText,
}: EventCardProps) {
  // Determine background color class based on type
  let bgColorClass = "bg-blue-50"
  let textColorClass = "text-blue-600"

  if (typeColor === "purple") {
    bgColorClass = "bg-purple-50"
    textColorClass = "text-purple-600"
  } else if (typeColor === "green") {
    bgColorClass = "bg-green-50"
    textColorClass = "text-green-600"
  } else if (typeColor === "red") {
    bgColorClass = "bg-red-50"
    textColorClass = "text-red-600"
  } else if (typeColor === "yellow") {
    bgColorClass = "bg-yellow-50"
    textColorClass = "text-yellow-600"
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow">
      <div className={`h-48 relative ${gradient ? `bg-gradient-to-r ${gradientFrom} ${gradientTo}` : ""}`}>
        {imageSrc && !gradient && (
          <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" />
        )}

        {gradient && specialText && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-sm font-medium">{specialText}</div>
              <div className="text-3xl font-bold mt-2">{title.split(" ").pop()}</div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div
          className={`text-xs font-medium ${textColorClass} ${bgColorClass} rounded-full px-3 py-1 inline-block mb-2`}
        >
          {type}
        </div>

        <h3 className="text-xl font-bold mb-2">{gradient ? title.split(" ").slice(0, -1).join(" ") : title}</h3>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            <span>{registeredCount} registered</span>
          </div>
        </div>

        <Link href={`/events/${id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
          View Details
        </Link>
      </div>
    </div>
  )
}

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Facebook, Twitter, Copy, User, Users, Tag } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/button"
import { getEventById } from "@/data/events"
import { notFound } from "next/navigation"

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = getEventById(params.id)

  if (!event) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="events" />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <Link href="/events" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Event Banner */}
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6">
              {event.isFeatured && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-medium z-10">
                  FEATURED EVENT
                </div>
              )}
              <Image
                src={event.imageURL || "/placeholder.svg"}
                alt={event.eventTitle}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Event Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-800"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Event Title and Status */}
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{event.eventTitle}</h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  event.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : event.status === "Cancelled"
                      ? "bg-red-100 text-red-800"
                      : event.status === "Completed"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {event.status}
              </span>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-lg mr-4">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(event.eventDate)}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-lg mr-4">
                  <Clock className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">
                    {formatTime(event.eventStartTime)} - {formatTime(event.eventEndTime)}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-lg mr-4">
                  <MapPin className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Venue</p>
                  <p className="font-medium">{event.venue}</p>
                  <p className="text-sm text-gray-500">{event.address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-lg mr-4">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Organizer</p>
                  <p className="font-medium">{event.organizer}</p>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">About This Event</h2>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            {/* Event Details */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Event Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-medium">{event.eventCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <span className="font-medium">{event.eventType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dress Code:</span>
                    <span className="font-medium">{event.dressCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Age Restriction:</span>
                    <span className="font-medium">{event.ageRestriction}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Policies</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 block">Ticketing:</span>
                    <span className="font-medium">{event.ticketingDetails}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Refund Policy:</span>
                    <span className="font-medium">{event.refundPolicy}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Website Link */}
            {event.websiteURL && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">More Information</h2>
                <a
                  href={event.websiteURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Visit Event Website
                  <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                </a>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Registration Card */}
            <div className="bg-white border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Registration</h2>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">Registered</span>
                </div>
                <span className="font-semibold">{event.registeredCount}</span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Available Seats</span>
                  <span>
                    {event.availableSeats} / {event.maxAttendees}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((event.maxAttendees - event.availableSeats) / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-gray-900">
                  {event.ticketingDetails.includes("Free") ? "FREE" : event.ticketingDetails}
                </div>
                <div className="text-sm text-gray-500">Registration</div>
              </div>

              <Link href={`/events/${event.eventId}/register`}>
                <Button
                  variant="primary"
                  className="w-full mb-2"
                  disabled={event.availableSeats === 0 || event.status !== "Active"}
                >
                  {event.availableSeats === 0 ? "Sold Out" : "Register Now"}
                </Button>
              </Link>

              {event.hashtag && (
                <div className="text-center mt-4">
                  <span className="text-sm text-gray-500">Share with</span>
                  <div className="font-medium text-blue-600">{event.hashtag}</div>
                </div>
              )}
            </div>

            {/* Organizer Card */}
            <div className="bg-white border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Organizer</h2>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">{event.organizer}</p>
                  <p className="text-sm text-gray-500">Event Organizer</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Contact Organizer
              </Button>
            </div>

            {/* Share Event Card */}
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Share Event</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition-colors">
                  <Facebook className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Facebook</span>
                </button>
                <button className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition-colors">
                  <Twitter className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">Twitter</span>
                </button>
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={`https://events.ur.ac.rw/events/${event.eventId}`}
                  readOnly
                  className="flex-grow border border-r-0 rounded-l-md px-3 py-2 bg-gray-50 text-sm"
                />
                <button className="bg-gray-900 text-white px-3 py-2 rounded-r-md hover:bg-gray-800 transition-colors">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

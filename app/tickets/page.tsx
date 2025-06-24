"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/providers"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Ticket, Calendar, MapPin, Eye, Download, QrCode, Search, Filter } from "lucide-react"
import { events } from "@/data/events"

// Mock user tickets data
const getUserTickets = (userId: string) => {
  return [
    {
      ticketId: "TKT-TECH-CONF-2025-ABC123",
      eventId: "tech-conference-2025",
      ticketType: "General Admission",
      price: 0,
      currency: "RWF",
      status: "confirmed",
      paymentStatus: "completed",
      purchaseDate: "2024-12-10T14:30:00Z",
      checkInStatus: "not_checked_in",
    },
    {
      ticketId: "TKT-CULTURAL-FEST-2025-DEF456",
      eventId: "cultural-festival-2025",
      ticketType: "VIP Access",
      price: 25000,
      currency: "RWF",
      status: "confirmed",
      paymentStatus: "completed",
      purchaseDate: "2024-12-08T10:15:00Z",
      checkInStatus: "checked_in",
    },
    {
      ticketId: "TKT-RESEARCH-SYMP-2025-GHI789",
      eventId: "research-symposium-2025",
      ticketType: "Student",
      price: 0,
      currency: "RWF",
      status: "confirmed",
      paymentStatus: "completed",
      purchaseDate: "2024-12-05T16:20:00Z",
      checkInStatus: "not_checked_in",
    },
    {
      ticketId: "TKT-CAREER-FAIR-2025-JKL012",
      eventId: "career-fair-2025",
      ticketType: "General",
      price: 0,
      currency: "RWF",
      status: "pending",
      paymentStatus: "pending",
      purchaseDate: "2024-12-12T09:45:00Z",
      checkInStatus: "not_checked_in",
    },
  ]
}

export default function TicketsPage() {
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [isLoggedIn, router])

  if (!isLoggedIn || !user) {
    return <div>Loading...</div>
  }

  const userTickets = getUserTickets(user.userId)

  // Filter tickets
  const filteredTickets = userTickets.filter((ticket) => {
    const event = events.find((e) => e.eventId === ticket.eventId)
    if (!event) return false

    const matchesSearch =
      event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return "Free"
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCheckInBadge = (status: string) => {
    switch (status) {
      case "checked_in":
        return <Badge className="bg-blue-100 text-blue-800">Checked In</Badge>
      case "not_checked_in":
        return <Badge className="bg-gray-100 text-gray-800">Not Checked In</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const statusOptions = [
    { value: "all", label: "All Tickets" },
    { value: "confirmed", label: "Confirmed" },
    { value: "pending", label: "Pending" },
    { value: "cancelled", label: "Cancelled" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="tickets" />

      <main className="flex-1">
        {/* Header Section */}
        <div className="bg-purple-50 py-16">
          <div className="container mx-auto px-4 md:px-16 max-w-7xl text-center">
            <h1
              className={`text-4xl font-bold mb-4 transform transition-all duration-1000 ease-out ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              My Tickets
            </h1>
            <p
              className={`text-gray-600 transform transition-all duration-1000 ease-out delay-200 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              View and manage all your event tickets in one place.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="container mx-auto px-4 md:px-16 max-w-7xl py-8">
          <div
            className={`flex flex-col md:flex-row gap-4 items-center transform transition-all duration-1000 ease-out delay-400 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="relative">
              <button
                className="flex items-center justify-between gap-2 border rounded-md px-4 py-2 text-gray-700 bg-white min-w-[160px] hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4 mr-1" />
                <span>{statusOptions.find((opt) => opt.value === statusFilter)?.label}</span>
              </button>

              {isFilterOpen && (
                <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg">
                  <ul className="py-1">
                    {statusOptions.map((option) => (
                      <li
                        key={option.value}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm transition-colors duration-150"
                        onClick={() => {
                          setStatusFilter(option.value)
                          setIsFilterOpen(false)
                        }}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tickets Grid */}
        <div className="container mx-auto px-4 md:px-16 max-w-7xl pb-16">
          {filteredTickets.length > 0 ? (
            <div
              className={`grid gap-6 transform transition-all duration-1000 ease-out delay-600 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {filteredTickets.map((ticket, index) => {
                const event = events.find((e) => e.eventId === ticket.eventId)
                if (!event) return null

                return (
                  <Card
                    key={ticket.ticketId}
                    className={`hover:shadow-lg transition-all duration-300 transform ${
                      isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${800 + index * 100}ms`,
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Event Image */}
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={event.imageURL || "/placeholder.svg"}
                            alt={event.eventTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {getStatusBadge(ticket.status)}
                            {getCheckInBadge(ticket.checkInStatus)}
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{event.eventTitle}</h3>
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="space-y-1">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{formatDate(event.eventDate)}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>{event.venue}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center">
                                <Ticket className="h-4 w-4 mr-2" />
                                <span>{ticket.ticketType}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-medium">{formatPrice(ticket.price, ticket.currency)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs text-gray-500">Ticket ID: {ticket.ticketId}</p>
                            <p className="text-xs text-gray-500">Purchased: {formatDate(ticket.purchaseDate)}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 w-full md:w-auto">
                          <Link href={`/tickets/${ticket.ticketId}`}>
                            <Button className="w-full md:w-auto" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </Link>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <QrCode className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div
              className={`text-center py-12 transform transition-all duration-1000 ease-out delay-600 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <Ticket className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search criteria or filters"
                  : "You haven't registered for any events yet"}
              </p>
              <Link href="/events">
                <Button>Browse Events</Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

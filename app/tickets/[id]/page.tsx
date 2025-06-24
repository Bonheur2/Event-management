"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  Download,
  Share2,
  QrCode,
  CheckCircle,
  CreditCard,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/providers"
import { events } from "@/data/events"

// Mock ticket data
const getTicketById = (id: string) => {
  const tickets = {
    "TKT-TECH-CONF-2025-ABC123": {
      ticketId: "TKT-TECH-CONF-2025-ABC123",
      eventId: "tech-conference-2025",
      userId: "user_student_001",
      ticketType: "General Admission",
      price: 0,
      currency: "RWF",
      status: "confirmed",
      paymentStatus: "completed",
      paymentMethod: "Free Registration",
      purchaseDate: "2024-12-10T14:30:00Z",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-TECH-CONF-2025-ABC123",
      checkInStatus: "not_checked_in",
      checkInTime: null,
      seatNumber: "A-15",
      specialRequirements: "Vegetarian meal",
      notes: "Student discount applied",
      refundable: true,
      transferable: false,
    },
    "TKT-CULTURAL-FEST-2025-DEF456": {
      ticketId: "TKT-CULTURAL-FEST-2025-DEF456",
      eventId: "cultural-festival-2025",
      userId: "user_student_001",
      ticketType: "VIP Access",
      price: 25000,
      currency: "RWF",
      status: "confirmed",
      paymentStatus: "completed",
      paymentMethod: "Mobile Money",
      purchaseDate: "2024-12-08T10:15:00Z",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-CULTURAL-FEST-2025-DEF456",
      checkInStatus: "checked_in",
      checkInTime: "2025-04-20T09:45:00Z",
      seatNumber: "VIP-5",
      specialRequirements: null,
      notes: "Early bird pricing",
      refundable: false,
      transferable: true,
    },
  }

  return tickets[id as keyof typeof tickets] || null
}

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const { user, isLoggedIn } = useAuth()
  const [showQR, setShowQR] = useState(false)

  const ticket = getTicketById(params.id)

  if (!ticket) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header activePage="tickets" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Ticket Not Found</h1>
            <p className="text-gray-600 mb-4">
              The ticket you're looking for doesn't exist or you don't have access to it.
            </p>
            <Link href="/user-dashboard" className="text-blue-600 hover:text-blue-800">
              Back to Dashboard
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Get event details
  const event = events.find((e) => e.eventId === ticket.eventId)

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header activePage="tickets" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-4">The event associated with this ticket no longer exists.</p>
            <Link href="/user-dashboard" className="text-blue-600 hover:text-blue-800">
              Back to Dashboard
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
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

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      case "refunded":
        return <Badge className="bg-gray-100 text-gray-800">Refunded</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCheckInStatusBadge = (status: string) => {
    switch (status) {
      case "checked_in":
        return <Badge className="bg-green-100 text-green-800">Checked In</Badge>
      case "not_checked_in":
        return <Badge className="bg-gray-100 text-gray-800">Not Checked In</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="tickets" />

      <main className="flex-1">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 md:px-16 max-w-7xl py-4">
          <Link href="/user-dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="container mx-auto px-4 md:px-16 max-w-7xl pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Ticket Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Ticket Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">Event Ticket</h1>
                      <p className="text-gray-600">Ticket ID: {ticket.ticketId}</p>
                    </div>
                    <div className="flex space-x-2">
                      {getStatusBadge(ticket.status)}
                      {getPaymentStatusBadge(ticket.paymentStatus)}
                    </div>
                  </div>

                  {/* Event Information */}
                  <div className="border rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={event.imageURL || "/placeholder.svg"}
                          alt={event.eventTitle}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{event.eventTitle}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{formatDate(event.eventDate)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>
                              {formatTime(event.eventStartTime)} - {formatTime(event.eventEndTime)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>
                              {event.venue}, {event.address}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Ticket Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium">{ticket.ticketType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-medium">{formatPrice(ticket.price, ticket.currency)}</span>
                        </div>
                        {ticket.seatNumber && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Seat:</span>
                            <span className="font-medium">{ticket.seatNumber}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Purchase Date:</span>
                          <span className="font-medium">{formatDate(ticket.purchaseDate)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Payment Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Method:</span>
                          <span className="font-medium">{ticket.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          {getPaymentStatusBadge(ticket.paymentStatus)}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Refundable:</span>
                          <span className="font-medium">{ticket.refundable ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Transferable:</span>
                          <span className="font-medium">{ticket.transferable ? "Yes" : "No"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Special Requirements */}
                  {ticket.specialRequirements && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Special Requirements</h4>
                      <p className="text-sm text-gray-700">{ticket.specialRequirements}</p>
                    </div>
                  )}

                  {/* Notes */}
                  {ticket.notes && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Notes</h4>
                      <p className="text-sm text-gray-700">{ticket.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Check-in Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Check-in Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">Status:</span>
                        {getCheckInStatusBadge(ticket.checkInStatus)}
                      </div>
                      {ticket.checkInTime && (
                        <p className="text-sm text-gray-600">
                          Checked in on {formatDate(ticket.checkInTime)} at{" "}
                          {new Date(ticket.checkInTime).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      )}
                    </div>
                    {ticket.checkInStatus === "not_checked_in" && (
                      <Button onClick={() => setShowQR(!showQR)} className="flex items-center space-x-2">
                        <QrCode className="h-4 w-4" />
                        <span>{showQR ? "Hide QR" : "Show QR"}</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* QR Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <QrCode className="h-5 w-5 mr-2" />
                    QR Code
                  </CardTitle>
                  <CardDescription>Show this QR code at the event entrance</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  {showQR || ticket.checkInStatus === "checked_in" ? (
                    <div className="space-y-4">
                      <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
                        <Image
                          src={ticket.qrCode || "/placeholder.svg"}
                          alt="Ticket QR Code"
                          width={200}
                          height={200}
                          className="mx-auto"
                        />
                      </div>
                      <p className="text-xs text-gray-500">Ticket ID: {ticket.ticketId}</p>
                    </div>
                  ) : (
                    <div className="py-8">
                      <QrCode className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500 mb-4">QR code is hidden for security</p>
                      <Button onClick={() => setShowQR(true)} variant="outline" size="sm">
                        Show QR Code
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Ticket
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Ticket
                  </Button>
                  {ticket.transferable && (
                    <Button className="w-full" variant="outline">
                      <User className="h-4 w-4 mr-2" />
                      Transfer Ticket
                    </Button>
                  )}
                  {ticket.refundable && ticket.paymentStatus === "completed" && (
                    <Button className="w-full" variant="outline">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Request Refund
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Event Organizer */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Organizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">{event.organizer}</p>
                      <p className="text-sm text-gray-500">Event Organizer</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    Contact Organizer
                  </Button>
                </CardContent>
              </Card>

              {/* Help */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    If you have any questions about your ticket or the event, please contact our support team.
                  </p>
                  <Button variant="outline" className="w-full" size="sm">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

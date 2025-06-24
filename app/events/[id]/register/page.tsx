"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Users, CreditCard, CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PaymentModal } from "@/components/payment-modal"
import { useAuth } from "@/components/providers"
import { useRouter } from "next/navigation"
import { getEventById } from "@/data/events"
import { notFound } from "next/navigation"

export default function EventRegistrationPage({ params }: { params: { id: string } }) {
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedTicketType, setSelectedTicketType] = useState("")
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const event = getEventById(params.id)

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

  if (!event) {
    notFound()
  }

  if (!isLoggedIn || !user) {
    return <div>Loading...</div>
  }

  // Mock ticket types for the event
  const ticketTypes = [
    {
      id: "general",
      name: "General Admission",
      price: 0,
      currency: "RWF",
      description: "Standard access to the event",
      available: event.availableSeats,
      benefits: ["Event access", "Welcome kit", "Networking opportunities"],
    },
    {
      id: "vip",
      name: "VIP Access",
      price: 25000,
      currency: "RWF",
      description: "Premium experience with additional benefits",
      available: Math.floor(event.availableSeats * 0.2),
      benefits: ["Priority seating", "VIP lounge access", "Premium catering", "Meet & greet with speakers"],
    },
    {
      id: "student",
      name: "Student Discount",
      price: 0,
      currency: "RWF",
      description: "Special pricing for students",
      available: Math.floor(event.availableSeats * 0.3),
      benefits: ["Event access", "Student networking session", "Career guidance"],
    },
  ]

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

  const handleTicketSelect = (ticketTypeId: string) => {
    setSelectedTicketType(ticketTypeId)
  }

  const handleRegister = () => {
    if (!selectedTicketType) return
    setIsPaymentModalOpen(true)
  }

  const handlePaymentSuccess = (paymentData: any) => {
    setRegistrationSuccess(true)
    setIsPaymentModalOpen(false)

    // Redirect to ticket details after a delay
    setTimeout(() => {
      router.push(`/tickets/${paymentData.ticketId}`)
    }, 3000)
  }

  const selectedTicket = ticketTypes.find((t) => t.id === selectedTicketType)

  if (registrationSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header activePage="events" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Registration Successful!</h1>
            <p className="text-gray-600 mb-6">
              You have successfully registered for {event.eventTitle}. You will receive a confirmation email shortly.
            </p>
            <div className="space-y-3">
              <Button onClick={() => router.push("/user-dashboard")} className="w-full">
                Go to Dashboard
              </Button>
              <Button variant="outline" onClick={() => router.push("/events")} className="w-full">
                Browse More Events
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="events" />

      <main className="flex-1">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 md:px-16 max-w-7xl py-4">
          <Link
            href={`/events/${event.eventId}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Event Details
          </Link>
        </div>

        <div className="container mx-auto px-4 md:px-16 max-w-7xl pb-16">
          <div
            className={`transform transition-all duration-1000 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Registration Form */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Register for Event</h1>
                  <p className="text-gray-600">Complete your registration for {event.eventTitle}</p>
                </div>

                {/* Event Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Event Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={event.imageURL || "/placeholder.svg"}
                          alt={event.eventTitle}
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
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{event.availableSeats} seats available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Ticket Types */}
                <Card>
                  <CardHeader>
                    <CardTitle>Select Ticket Type</CardTitle>
                    <CardDescription>Choose the ticket type that best suits your needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {ticketTypes.map((ticket) => (
                        <div
                          key={ticket.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedTicketType === ticket.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          } ${ticket.available === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={() => ticket.available > 0 && handleTicketSelect(ticket.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <input
                                  type="radio"
                                  name="ticketType"
                                  value={ticket.id}
                                  checked={selectedTicketType === ticket.id}
                                  onChange={() => handleTicketSelect(ticket.id)}
                                  disabled={ticket.available === 0}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <h4 className="font-semibold">{ticket.name}</h4>
                                <Badge variant={ticket.available > 0 ? "default" : "secondary"}>
                                  {ticket.available > 0 ? `${ticket.available} available` : "Sold out"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                              <div className="space-y-1">
                                {ticket.benefits.map((benefit, index) => (
                                  <div key={index} className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                                    <span>{benefit}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold">{formatPrice(ticket.price, ticket.currency)}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Registration Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={handleRegister}
                    disabled={!selectedTicketType || (selectedTicket && selectedTicket.available === 0)}
                    className="px-8"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {selectedTicket && selectedTicket.price === 0 ? "Register for Free" : "Proceed to Payment"}
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Registration Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Registration Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Event:</span>
                        <span className="font-medium text-right">{event.eventTitle}</span>
                      </div>
                      {selectedTicket && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Ticket Type:</span>
                            <span className="font-medium">{selectedTicket.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Price:</span>
                            <span className="font-medium">
                              {formatPrice(selectedTicket.price, selectedTicket.currency)}
                            </span>
                          </div>
                          <div className="border-t pt-3">
                            <div className="flex justify-between text-lg font-bold">
                              <span>Total:</span>
                              <span>{formatPrice(selectedTicket.price, selectedTicket.currency)}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* User Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Registrant Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <div className="font-medium">
                          {user.firstName} {user.lastName}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <div className="font-medium">{user.email}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span>
                        <div className="font-medium">{user.phoneNumber}</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href="/profile" className="text-blue-600 hover:text-blue-800 text-sm">
                        Update profile information
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Event Policies */}
                <Card>
                  <CardHeader>
                    <CardTitle>Event Policies</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-600 space-y-2">
                    <div>
                      <strong>Refund Policy:</strong>
                      <p>{event.refundPolicy}</p>
                    </div>
                    <div>
                      <strong>Dress Code:</strong>
                      <p>{event.dressCode}</p>
                    </div>
                    <div>
                      <strong>Age Restriction:</strong>
                      <p>{event.ageRestriction}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      {selectedTicket && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          eventTitle={event.eventTitle}
          ticketType={selectedTicket.name}
          price={selectedTicket.price}
          currency={selectedTicket.currency}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      <Footer />
    </div>
  )
}

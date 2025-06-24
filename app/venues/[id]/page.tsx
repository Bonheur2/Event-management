"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Users, Calendar, Clock, CheckCircle, ExternalLink, Phone, Mail, User } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getVenueById } from "@/data/venues"
import { notFound } from "next/navigation"

export default function VenuePage({ params }: { params: { id: string } }) {
  const venue = getVenueById(params.id)
  const [activeTab, setActiveTab] = useState("details")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")

  if (!venue) {
    notFound()
  }

  // Generate time slots based on selected date
  const getTimeSlots = () => {
    if (!selectedDate || !venue.availability) return []

    const matchingDay = venue.availability.find(
      (day) => new Date(day.date).toISOString().split("T")[0] === selectedDate,
    )

    return matchingDay ? matchingDay.timeSlots : []
  }

  const timeSlots = getTimeSlots()
  const amenitiesList = venue.amenities.split(",").map((amenity) => amenity.trim())

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="venues" />

      <main className="flex-1 container mx-auto px-16 py-8 max-w-7xl">
        <Link href="/venues" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Venues
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Venue Banner */}
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6">
              <Image
                src={venue.imageSrc || "/placeholder.svg"}
                alt={venue.venueName}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {venue.venueType}
                </span>
              </div>
              {venue.isBooked && (
                <div className="absolute top-4 right-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Currently Booked
                  </span>
                </div>
              )}
            </div>

            {/* Venue Title */}
            <h1 className="text-3xl font-bold mb-6">{venue.venueName}</h1>

            {/* Venue Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-lg mr-4">
                  <MapPin className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{venue.location}</p>
                  <a
                    href={venue.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center mt-1"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View on Google Maps
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-lg mr-4">
                  <Users className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Capacity</p>
                  <p className="font-medium">{venue.capacity} people</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-lg mr-4">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact Person</p>
                  <p className="font-medium">{venue.contactPerson}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-lg mr-4">
                  <Phone className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{venue.contactPhone}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b mb-6">
              <div className="flex">
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === "details"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === "availability"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("availability")}
                >
                  Availability
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "details" && (
              <>
                {/* About This Venue */}
                {venue.description && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">About This Venue</h2>
                    <p className="text-gray-600 mb-4">{venue.description}</p>
                  </div>
                )}

                {/* Amenities */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenitiesList.map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Contact Person</p>
                        <p className="font-medium">{venue.contactPerson}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{venue.contactPhone}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{venue.contactEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Website Link */}
                {venue.websiteURL && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">More Information</h2>
                    <a
                      href={venue.websiteURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Visit Venue Website
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                )}
              </>
            )}

            {activeTab === "availability" && venue.availability && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Venue Availability</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Available Dates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {venue.availability.map((day) => (
                        <div
                          key={day.date}
                          className={`border p-3 rounded-md cursor-pointer transition-colors ${
                            selectedDate === new Date(day.date).toISOString().split("T")[0]
                              ? "bg-blue-50 border-blue-200"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => setSelectedDate(new Date(day.date).toISOString().split("T")[0])}
                        >
                          <p className="font-medium">{day.date}</p>
                          <p className="text-sm text-gray-500">{day.timeSlots.length} time slots available</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedDate && (
                    <div>
                      <h3 className="text-lg font-medium mb-3">Available Time Slots</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {timeSlots.map((slot) => (
                          <div
                            key={slot}
                            className={`border p-3 rounded-md cursor-pointer flex items-center ${
                              selectedTimeSlot === slot ? "bg-blue-50 border-blue-200" : "hover:bg-gray-100"
                            }`}
                            onClick={() => setSelectedTimeSlot(slot)}
                          >
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            <span>{slot}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <button
                      className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 ${
                        !selectedDate || !selectedTimeSlot || venue.isBooked ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={!selectedDate || !selectedTimeSlot || venue.isBooked}
                    >
                      {venue.isBooked ? "Venue Currently Booked" : "Book This Time Slot"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            {/* Booking Card */}
            <div className="bg-white border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Book This Venue</h2>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{venue.contactEmail}</span>
                </div>
                <div className="flex items-center mb-4">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{venue.contactPhone}</span>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={venue.isBooked}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700 mb-1">
                  Time Slot
                </label>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={venue.isBooked}
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className={`w-full py-2 rounded-md mb-4 ${
                  selectedDate && selectedTimeSlot && !venue.isBooked
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!selectedDate || !selectedTimeSlot || venue.isBooked}
              >
                {venue.isBooked ? "Currently Booked" : "Book Now"}
              </button>
            </div>

            {/* Availability Card */}
            {venue.availability && (
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Upcoming Availability</h2>
                <div className="space-y-4">
                  {venue.availability.map((day) => (
                    <div key={day.date} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <p className="font-medium mb-2">{day.date}</p>
                      <div className="space-y-2">
                        {day.timeSlots.map((slot) => (
                          <div key={slot} className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">{slot}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

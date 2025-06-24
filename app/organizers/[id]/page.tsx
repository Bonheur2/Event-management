"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Users, Calendar, MapPin, Mail, Phone, Globe, Building, Eye } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { events } from "@/data/events"

// Mock organizer data
const getOrganizerById = (id: string) => {
  const organizers = {
    "binary-hub": {
      id: "binary-hub",
      name: "Binary Hub",
      description:
        "Global leader in innovative solutions for various industries. We specialize in cutting-edge technology development, digital transformation, and strategic consulting services.",
      logo: "/placeholder.svg?height=200&width=200&text=BINARY+HUB",
      coverImage: "/placeholder.svg?height=400&width=800&text=BINARY+HUB+COVER",
      memberCount: 45,
      eventCount: 12,
      foundedDate: "2018-03-15",
      website: "https://binaryhub.com",
      email: "contact@binaryhub.com",
      phone: "+250 788 123 456",
      address: "KG 15 Ave, Nyarutarama, Kigali, Rwanda",
      tags: ["Corporate", "Technology", "Innovation"],
      socialMedia: {
        linkedin: "https://linkedin.com/company/binary-hub",
        twitter: "https://twitter.com/binaryhub",
        facebook: "https://facebook.com/binaryhub",
      },
      stats: {
        totalEvents: 45,
        totalAttendees: 2500,
        averageRating: 4.8,
        upcomingEvents: 3,
      },
      team: [
        {
          id: "1",
          name: "John Doe",
          role: "CEO & Founder",
          image: "/placeholder.svg?height=100&width=100&text=JD",
          bio: "Visionary leader with 15+ years in tech industry",
        },
        {
          id: "2",
          name: "Jane Smith",
          role: "CTO",
          image: "/placeholder.svg?height=100&width=100&text=JS",
          bio: "Technical expert specializing in AI and machine learning",
        },
        {
          id: "3",
          name: "Mike Johnson",
          role: "Head of Events",
          image: "/placeholder.svg?height=100&width=100&text=MJ",
          bio: "Event management specialist with global experience",
        },
      ],
    },
    "university-of-rwanda": {
      id: "university-of-rwanda",
      name: "University Of Rwanda",
      description:
        "Top Higher Education Institution in Rwanda, committed to excellence in teaching, research, and community service. We foster innovation and critical thinking among our students.",
      logo: "/placeholder.svg?height=200&width=200&text=UR",
      coverImage: "/placeholder.svg?height=400&width=800&text=UNIVERSITY+COVER",
      memberCount: 120,
      eventCount: 25,
      foundedDate: "2013-09-01",
      website: "https://ur.ac.rw",
      email: "info@ur.ac.rw",
      phone: "+250 788 300 000",
      address: "University of Rwanda, Kigali Campus, Rwanda",
      tags: ["Educational", "Research", "Academic"],
      socialMedia: {
        linkedin: "https://linkedin.com/school/university-of-rwanda",
        twitter: "https://twitter.com/ur_rwanda",
        facebook: "https://facebook.com/UniversityofRwanda",
      },
      stats: {
        totalEvents: 150,
        totalAttendees: 15000,
        averageRating: 4.9,
        upcomingEvents: 8,
      },
      team: [
        {
          id: "1",
          name: "Prof. Alexandre Lyambabaje",
          role: "Vice-Chancellor",
          image: "/placeholder.svg?height=100&width=100&text=AL",
          bio: "Distinguished academic leader and researcher",
        },
        {
          id: "2",
          name: "Dr. Sarah Uwimana",
          role: "Deputy Vice-Chancellor Academic",
          image: "/placeholder.svg?height=100&width=100&text=SU",
          bio: "Expert in academic affairs and curriculum development",
        },
      ],
    },
  }

  return organizers[id as keyof typeof organizers] || null
}

export default function OrganizerDetailPage({ params }: { params: { id: string } }) {
  const organizer = getOrganizerById(params.id)
  const [activeTab, setActiveTab] = useState("about")

  if (!organizer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header activePage="organizers" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Organizer Not Found</h1>
            <p className="text-gray-600 mb-4">The organizer you're looking for doesn't exist.</p>
            <Link href="/organizers" className="text-blue-600 hover:text-blue-800">
              Back to Organizers
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Get organizer's events
  const organizerEvents = events
    .filter((event) => event.organizer.toLowerCase().includes(organizer.name.toLowerCase()))
    .slice(0, 6)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTagClass = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "corporate":
      case "technology":
        return "bg-blue-50 text-blue-700"
      case "educational":
      case "academic":
        return "bg-green-50 text-green-700"
      case "research":
        return "bg-purple-50 text-purple-700"
      case "innovation":
        return "bg-orange-50 text-orange-700"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="organizers" />

      <main className="flex-1">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 md:px-16 max-w-7xl py-4">
          <Link href="/organizers" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Organizers
          </Link>
        </div>

        {/* Cover Image */}
        <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-500 to-purple-600">
          <Image
            src={organizer.coverImage || "/placeholder.svg"}
            alt={`${organizer.name} cover`}
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Organizer Header */}
        <div className="container mx-auto px-4 md:px-16 max-w-7xl">
          <div className="relative -mt-20 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-lg shadow-md overflow-hidden flex items-center justify-center p-4">
                    <Image
                      src={organizer.logo || "/placeholder.svg"}
                      alt={organizer.name}
                      width={120}
                      height={120}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {organizer.tags.map((tag) => (
                      <Badge key={tag} className={getTagClass(tag)}>
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{organizer.name}</h1>
                  <p className="text-gray-600 mb-4">{organizer.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-blue-600">{organizer.memberCount}</div>
                      <div className="text-sm text-gray-600">Members</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-green-600">{organizer.stats.totalEvents}</div>
                      <div className="text-sm text-gray-600">Total Events</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-600">
                        {organizer.stats.totalAttendees.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Attendees</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-orange-600">{organizer.stats.averageRating}</div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button className="w-full md:w-auto">Follow Organization</Button>
                  <Button variant="outline" className="w-full md:w-auto">
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b mb-8">
            <div className="flex space-x-8">
              <button
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "about"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("about")}
              >
                About
              </button>
              <button
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "events"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("events")}
              >
                Events ({organizerEvents.length})
              </button>
              <button
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "team"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("team")}
              >
                Team
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="pb-16">
            {activeTab === "about" && (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  {/* About Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>About {organizer.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed mb-6">{organizer.description}</p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Founded</h4>
                          <p className="text-gray-600">{formatDate(organizer.foundedDate)}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Location</h4>
                          <p className="text-gray-600">{organizer.address}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Events */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Events</CardTitle>
                      <CardDescription>Latest events organized by {organizer.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {organizerEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.eventId}
                            className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50"
                          >
                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                              <Image
                                src={event.imageURL || "/placeholder.svg"}
                                alt={event.eventTitle}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{event.eventTitle}</h4>
                              <p className="text-sm text-gray-600">
                                {formatDate(event.eventDate)} • {event.venue}
                              </p>
                              <p className="text-sm text-gray-500">{event.registeredCount} attendees</p>
                            </div>
                            <Link href={`/events/${event.eventId}`}>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        ))}
                      </div>
                      {organizerEvents.length > 3 && (
                        <div className="mt-4 text-center">
                          <Button variant="outline" onClick={() => setActiveTab("events")}>
                            View All Events
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <a href={`mailto:${organizer.email}`} className="text-blue-600 hover:text-blue-800">
                          {organizer.email}
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <a href={`tel:${organizer.phone}`} className="text-blue-600 hover:text-blue-800">
                          {organizer.phone}
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-gray-400" />
                        <a
                          href={organizer.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Visit Website
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-600">{organizer.address}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Social Media */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Follow Us</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {organizer.socialMedia.linkedin && (
                          <a
                            href={organizer.socialMedia.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 text-blue-600 hover:text-blue-800"
                          >
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Building className="h-4 w-4" />
                            </div>
                            <span>LinkedIn</span>
                          </a>
                        )}
                        {organizer.socialMedia.twitter && (
                          <a
                            href={organizer.socialMedia.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 text-blue-400 hover:text-blue-600"
                          >
                            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                              <Building className="h-4 w-4" />
                            </div>
                            <span>Twitter</span>
                          </a>
                        )}
                        {organizer.socialMedia.facebook && (
                          <a
                            href={organizer.socialMedia.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 text-blue-700 hover:text-blue-900"
                          >
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Building className="h-4 w-4" />
                            </div>
                            <span>Facebook</span>
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "events" && (
              <div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {organizerEvents.map((event) => (
                    <Card key={event.eventId} className="hover:shadow-lg transition-shadow">
                      <div className="h-48 relative">
                        <Image
                          src={event.imageURL || "/placeholder.svg"}
                          alt={event.eventTitle}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge
                            className={`${
                              event.typeColor === "blue"
                                ? "bg-blue-100 text-blue-800"
                                : event.typeColor === "green"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {event.eventType}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{event.eventTitle}</h3>
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{formatDate(event.eventDate)}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{event.venue}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{event.registeredCount} registered</span>
                          </div>
                        </div>
                        <Link href={`/events/${event.eventId}`}>
                          <Button className="w-full" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {organizerEvents.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                    <p className="text-gray-600">This organizer hasn't created any events yet.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "team" && (
              <div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {organizer.team.map((member) => (
                    <Card key={member.id} className="text-center">
                      <CardContent className="p-6">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
                          <Image
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-semibold mb-1">{member.name}</h3>
                        <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                        <p className="text-gray-600 text-sm">{member.bio}</p>
                      </CardContent>
                    </Card>
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

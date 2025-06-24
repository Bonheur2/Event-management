"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/providers"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Users,
  Ticket,
  Star,
  Eye,
  CheckCircle,
  Building2,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { events } from "@/data/events"

// Mock data for user's events and tickets
const getUserEvents = (userId: string) => {
  // Simulate user's attended events - only attended and registered
  const attendedEvents = events.slice(0, 12).map((event, index) => ({
    ...event,
    attendanceStatus: index % 2 === 0 ? "attended" : "registered",
    rating: index % 3 === 0 ? 5 : index % 3 === 1 ? 4 : null,
    ticketId: `TKT-${event.eventId.toUpperCase()}-${Math.random().toString(36).substr(2, 6)}`,
    registrationDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }))

  return attendedEvents
}

// Mock data for user's organizations
const getUserOrganizations = (userId: string) => [
  {
    id: "org-1",
    name: "Tech Innovators Hub",
    role: "Member",
    joinDate: "2023-01-15",
    eventsCount: 8,
    status: "active",
  },
  {
    id: "org-2",
    name: "Digital Marketing Society",
    role: "Admin",
    joinDate: "2023-03-20",
    eventsCount: 12,
    status: "active",
  },
  {
    id: "org-3",
    name: "Startup Founders Network",
    role: "Member",
    joinDate: "2023-06-10",
    eventsCount: 5,
    status: "active",
  },
  {
    id: "org-4",
    name: "AI Research Group",
    role: "Member",
    joinDate: "2023-08-05",
    eventsCount: 3,
    status: "active",
  },
  {
    id: "org-5",
    name: "Web Development Community",
    role: "Admin",
    joinDate: "2023-09-12",
    eventsCount: 7,
    status: "active",
  },
  {
    id: "org-6",
    name: "Data Science Society",
    role: "Member",
    joinDate: "2023-10-20",
    eventsCount: 4,
    status: "active",
  },
]

const getUserStats = () => ({
  totalEventsAttended: 12,
  upcomingEvents: 3,
  totalTickets: 15,
  totalOrganizations: 6,
})

// Pagination component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      <div className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default function UserDashboard() {
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Pagination states
  const [overviewPage, setOverviewPage] = useState(1)
  const [ticketsPage, setTicketsPage] = useState(1)
  const [attendedPage, setAttendedPage] = useState(1)
  const [organizationsPage, setOrganizationsPage] = useState(1)

  const itemsPerPage = 5

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

  const userEvents = getUserEvents(user.userId)
  const userOrganizations = getUserOrganizations(user.userId)
  const userStats = getUserStats()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "attended":
        return <Badge className="bg-green-100 text-green-800">Attended</Badge>
      case "registered":
        return <Badge className="bg-blue-100 text-blue-800">Registered</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Pagination helpers
  const getPaginatedData = (data: any[], page: number) => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }

  const getTotalPages = (dataLength: number) => {
    return Math.ceil(dataLength / itemsPerPage)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="user-dashboard" />

      <main className="flex-1">
        {/* Dashboard Content with Sidebar */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
            <div className="p-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "overview"
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Home className="h-4 w-4 mr-3" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("tickets")}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "tickets"
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Ticket className="h-4 w-4 mr-3" />
                  My Tickets
                </button>
                <button
                  onClick={() => setActiveTab("attended")}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "attended"
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <CheckCircle className="h-4 w-4 mr-3" />
                  Attended Events
                </button>
                <button
                  onClick={() => setActiveTab("organizations")}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "organizations"
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Building2 className="h-4 w-4 mr-3" />
                  My Organizations
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div
              className={`transform transition-all duration-1000 ease-out ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* User Welcome Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                        {user.profilePictureURL ? (
                          <img
                            src={user.profilePictureURL || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          `${user.firstName[0]}${user.lastName[0]}`
                        )}
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.firstName}!</h1>
                        <p className="text-gray-600">Here's your event activity overview</p>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">{userStats.totalEventsAttended}</div>
                        <div className="text-sm text-gray-600">Events Attended</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-green-600">{userStats.upcomingEvents}</div>
                        <div className="text-sm text-gray-600">Upcoming</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-purple-600">{userStats.totalTickets}</div>
                        <div className="text-sm text-gray-600">Total Tickets</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-orange-600">{userStats.totalOrganizations}</div>
                        <div className="text-sm text-gray-600">Organizations</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Events Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        Recent Events
                      </CardTitle>
                      <CardDescription>Your latest event activities</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="text-left py-3 px-4 font-medium text-gray-900">Event</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-900">Venue</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getPaginatedData(userEvents, overviewPage).map((event) => (
                              <tr key={event.eventId} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">
                                  <div>
                                    <h4 className="font-medium">{event.eventTitle}</h4>
                                    <p className="text-sm text-gray-600">{event.eventType}</p>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">{formatDate(event.eventDate)}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{event.venue}</td>
                                <td className="py-3 px-4">{getStatusBadge(event.attendanceStatus)}</td>
                                <td className="py-3 px-4">
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <Pagination
                        currentPage={overviewPage}
                        totalPages={getTotalPages(userEvents.length)}
                        onPageChange={setOverviewPage}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* My Tickets Tab */}
              {activeTab === "tickets" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">My Tickets</h2>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="text-left py-4 px-6 font-medium text-gray-900">Event</th>
                              <th className="text-left py-4 px-6 font-medium text-gray-900">Date & Time</th>
                              <th className="text-left py-4 px-6 font-medium text-gray-900">Venue</th>
                              <th className="text-left py-4 px-6 font-medium text-gray-900">Ticket ID</th>
                              <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                              <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getPaginatedData(userEvents, ticketsPage).map((event) => (
                              <tr key={event.ticketId} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-6">
                                  <div>
                                    <h4 className="font-medium">{event.eventTitle}</h4>
                                    <p className="text-sm text-gray-600">{event.eventType}</p>
                                  </div>
                                </td>
                                <td className="py-4 px-6">
                                  <div className="text-sm">
                                    <div className="font-medium">{formatDate(event.eventDate)}</div>
                                    <div className="text-gray-600">
                                      {formatTime(event.eventStartTime)} - {formatTime(event.eventEndTime)}
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-600">{event.venue}</td>
                                <td className="py-4 px-6">
                                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">{event.ticketId}</code>
                                </td>
                                <td className="py-4 px-6">{getStatusBadge(event.attendanceStatus)}</td>
                                <td className="py-4 px-6">
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="outline">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <Pagination
                        currentPage={ticketsPage}
                        totalPages={getTotalPages(userEvents.length)}
                        onPageChange={setTicketsPage}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Attended Events Tab */}
              {activeTab === "attended" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Attended Events</h2>
                    <div className="text-sm text-gray-600">
                      Total: {userEvents.filter((e) => e.attendanceStatus === "attended").length} events
                    </div>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="text-left py-4 px-6 font-medium text-gray-900">Event</th>
                              <th className="text-left py-4 px-6 font-medium text-gray-900">Date</th>
                              <th className="text-left py-4 px-6 font-medium text-gray-900">Venue</th>
                              <th className="text-left py-4 px-6 font-medium text-gray-900">Type</th>
                              <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getPaginatedData(
                              userEvents.filter((event) => event.attendanceStatus === "attended"),
                              attendedPage,
                            ).map((event) => (
                              <tr key={event.eventId} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-6">
                                  <div>
                                    <h4 className="font-medium">{event.eventTitle}</h4>
                                    <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                                  </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-600">{formatDate(event.eventDate)}</td>
                                <td className="py-4 px-6 text-sm text-gray-600">{event.venue}</td>
                                <td className="py-4 px-6 text-sm text-gray-600">{event.eventType}</td>
                                <td className="py-4 px-6">
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="outline">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Star className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <Pagination
                        currentPage={attendedPage}
                        totalPages={getTotalPages(userEvents.filter((e) => e.attendanceStatus === "attended").length)}
                        onPageChange={setAttendedPage}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* My Organizations Tab */}
              {activeTab === "organizations" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">My Organizations</h2>
                    <div className="text-sm text-gray-600">Total: {userOrganizations.length} organizations</div>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="text-left py-4 px-6 font-medium text-gray-900">Organization</th>
                              <th className="text-left py-4 px-6 font-medium text-gray-900">Join Date</th>
                              <th className="text-left py-4 px-6 font-medium text-gray-900">Events Count</th>
                              <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getPaginatedData(userOrganizations, organizationsPage).map((org) => (
                              <tr key={org.id} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-6">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <Building2 className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium">{org.name}</h4>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-600">{formatDate(org.joinDate)}</td>
                                <td className="py-4 px-6 text-sm text-gray-600">{org.eventsCount} events</td>
                                <td className="py-4 px-6">
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="outline">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Users className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <Pagination
                        currentPage={organizationsPage}
                        totalPages={getTotalPages(userOrganizations.length)}
                        onPageChange={setOrganizationsPage}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

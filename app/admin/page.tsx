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
  Users,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Shield,
  Eye,
  Edit,
  Trash2,
  UserX,
  Home,
} from "lucide-react"
import { events } from "@/data/events"
import { venues } from "@/data/venues"
import { users } from "@/data/users"

export default function AdminDashboard() {
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedEvent, setSelectedEvent] = useState(null) // NEW STATE

  useEffect(() => {
    // Redirect if not logged in or not admin
    if (!isLoggedIn || user?.roleId !== "role_admin") {
      router.push("/")
      return
    }

    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [isLoggedIn, user, router])

  // Don't render if not admin
  if (!isLoggedIn || user?.roleId !== "role_admin") {
    return null
  }

  // Mock data for pending approvals
  const pendingEvents = events.filter((event) => event.status === "Draft").slice(0, 3)
  const pendingVenues = venues.filter((venue) => !venue.isAvailable).slice(0, 3)

  // Statistics
  const stats = {
    totalUsers: users.length,
    totalEvents: events.length,
    totalVenues: venues.length,
    pendingApprovals: pendingEvents.length + pendingVenues.length,
    activeEvents: events.filter((event) => event.status === "Active").length,
    completedEvents: events.filter((event) => event.status === "Completed").length,
  }

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "events", label: "Events", icon: Calendar },
    { id: "venues", label: "Venues", icon: MapPin },
    { id: "users", label: "Users", icon: Users },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="admin" />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-6">
            <div className="flex items-center mb-8">
              <Shield className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
            </div>
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Reduced Header Section */}
          <div className="bg-gray-50 border-b py-8">
            <div className="px-8">
              <div
                className={`transform transition-all duration-1000 ease-out ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Manage events, venues, users, and system settings</p>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 p-8">
            <div
              className={`transform transition-all duration-1000 ease-out delay-400 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {/* Show event details if selectedEvent is set */}
              {selectedEvent ? (
                <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8">
                  <Button variant="outline" onClick={() => setSelectedEvent(null)} className="mb-4">
                    ← Back to Events
                  </Button>
                  <h2 className="text-2xl font-bold mb-2">{selectedEvent.eventTitle}</h2>
                  <p className="text-gray-600 mb-2">{selectedEvent.eventDate} • {selectedEvent.venue}</p>
                  <Badge variant={selectedEvent.status === "Active" ? "default" : "secondary"}>
                    {selectedEvent.status}
                  </Badge>
                  <div className="mt-4">
                    <p><strong>Description:</strong> {selectedEvent.description || "No description provided."}</p>
                    <p className="mt-2"><strong>Registered:</strong> {selectedEvent.registeredCount}</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <div className="space-y-8">
                      {/* Statistics Cards */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Total Users</p>
                                <p className="text-2xl font-bold">{stats.totalUsers}</p>
                              </div>
                              <Users className="h-8 w-8 text-blue-600" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Total Events</p>
                                <p className="text-2xl font-bold">{stats.totalEvents}</p>
                              </div>
                              <Calendar className="h-8 w-8 text-green-600" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Total Venues</p>
                                <p className="text-2xl font-bold">{stats.totalVenues}</p>
                              </div>
                              <MapPin className="h-8 w-8 text-purple-600" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Pending Approvals</p>
                                <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
                              </div>
                              <AlertTriangle className="h-8 w-8 text-orange-600" />
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Pending Approvals */}
                      <div className="grid md:grid-cols-2 gap-8">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Clock className="h-5 w-5 mr-2" />
                              Pending Event Approvals
                            </CardTitle>
                            <CardDescription>Events waiting for approval</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {pendingEvents.length > 0 ? (
                                pendingEvents.map((event) => (
                                  <div
                                    key={event.eventId}
                                    className="flex items-center justify-between p-3 border rounded-lg"
                                  >
                                    <div>
                                      <p className="font-medium">{event.eventTitle}</p>
                                      <p className="text-sm text-gray-600">{event.eventDate}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button size="sm" variant="outline" onClick={() => setSelectedEvent(event)}>
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button size="sm" variant="outline">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                      </Button>
                                      <Button size="sm" variant="outline">
                                        <XCircle className="h-4 w-4 text-red-600" />
                                      </Button>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-500 text-center py-4">No pending event approvals</p>
                              )}
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Clock className="h-5 w-5 mr-2" />
                              Pending Venue Approvals
                            </CardTitle>
                            <CardDescription>Venues waiting for approval</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {pendingVenues.length > 0 ? (
                                pendingVenues.map((venue) => (
                                  <div
                                    key={venue.venueId}
                                    className="flex items-center justify-between p-3 border rounded-lg"
                                  >
                                    <div>
                                      <p className="font-medium">{venue.venueName}</p>
                                      <p className="text-sm text-gray-600">
                                        {venue.location} • Capacity: {venue.capacity}
                                      </p>
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button size="sm" variant="outline">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                      </Button>
                                      <Button size="sm" variant="outline">
                                        <XCircle className="h-4 w-4 text-red-600" />
                                      </Button>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-500 text-center py-4">No pending venue approvals</p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}

                  {/* Events Tab */}
                  {activeTab === "events" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Event Management</h2>
                        <Button>Create New Event</Button>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>All Events</CardTitle>
                          <CardDescription>Manage and approve events</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {events.slice(0, 8).map((event) => (
                              <div
                                key={event.eventId}
                                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                                onClick={() => setSelectedEvent(event)} // SET SELECTED EVENT
                              >
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3">
                                    <h3 className="font-medium">{event.eventTitle}</h3>
                                    <Badge
                                      variant={
                                        event.status === "Active"
                                          ? "default"
                                          : event.status === "Draft"
                                            ? "secondary"
                                            : "outline"
                                      }
                                    >
                                      {event.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {event.eventDate} • {event.venue} • {event.registeredCount} registered
                                  </p>
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline" onClick={e => { e.stopPropagation(); setSelectedEvent(event); }}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={e => e.stopPropagation()}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  {event.status === "Draft" && (
                                    <Button size="sm" variant="outline" onClick={e => e.stopPropagation()}>
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    </Button>
                                  )}
                                  <Button size="sm" variant="outline" onClick={e => e.stopPropagation()}>
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Venues Tab */}
                  {activeTab === "venues" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Venue Management</h2>
                        <Button>Add New Venue</Button>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>All Venues</CardTitle>
                          <CardDescription>Manage venue availability and bookings</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {venues.map((venue) => (
                              <div key={venue.venueId} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3">
                                    <h3 className="font-medium">{venue.venueName}</h3>
                                    <Badge variant={venue.isAvailable ? "default" : "secondary"}>
                                      {venue.isAvailable ? "Available" : "Pending Approval"}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {venue.location} • Capacity: {venue.capacity} • {venue.venueType}
                                  </p>
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  {!venue.isAvailable && (
                                    <Button size="sm" variant="outline">
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    </Button>
                                  )}
                                  <Button size="sm" variant="outline">
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Users Tab */}
                  {activeTab === "users" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">User Management</h2>
                        <Button>Add New User</Button>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>All Users</CardTitle>
                          <CardDescription>Manage user accounts and permissions</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {users.map((userData) => (
                              <div
                                key={userData.userId}
                                className="flex items-center justify-between p-4 border rounded-lg"
                              >
                                <div className="flex items-center space-x-4">
                                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                    {userData.firstName[0]}
                                    {userData.lastName[0]}
                                  </div>
                                  <div>
                                    <div className="flex items-center space-x-2">
                                      <h3 className="font-medium">
                                        {userData.firstName} {userData.lastName}
                                      </h3>
                                      <Badge variant={userData.roleId === "role_admin" ? "default" : "secondary"}>
                                        {userData.roleId === "role_admin" ? "Admin" : "User"}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600">{userData.email}</p>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <UserX className="h-4 w-4 text-red-600" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

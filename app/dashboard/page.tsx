"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for the charts
const eventsByCategory = [
  { name: "Conference", value: 35 },
  { name: "Workshop", value: 25 },
  { name: "Seminar", value: 20 },
  { name: "Exhibition", value: 15 },
  { name: "Other", value: 5 },
]

const eventsByMonth = [
  { name: "Jan", events: 12 },
  { name: "Feb", events: 15 },
  { name: "Mar", events: 18 },
  { name: "Apr", events: 22 },
  { name: "May", events: 28 },
  { name: "Jun", events: 32 },
  { name: "Jul", events: 38 },
  { name: "Aug", events: 42 },
  { name: "Sep", events: 45 },
  { name: "Oct", events: 48 },
  { name: "Nov", events: 52 },
  { name: "Dec", events: 58 },
]

const eventsByStatus = [
  { name: "Upcoming", value: 45 },
  { name: "Ongoing", value: 15 },
  { name: "Completed", value: 35 },
  { name: "Cancelled", value: 5 },
]

const attendanceByEventType = [
  { name: "Conference", attendance: 85 },
  { name: "Workshop", attendance: 92 },
  { name: "Seminar", attendance: 78 },
  { name: "Exhibition", attendance: 65 },
  { name: "Other", attendance: 70 },
]

const registrationVsAttendance = [
  { name: "Conference", registrations: 100, attendance: 85 },
  { name: "Workshop", registrations: 120, attendance: 110 },
  { name: "Seminar", registrations: 90, attendance: 70 },
  { name: "Exhibition", registrations: 80, attendance: 52 },
  { name: "Other", registrations: 75, attendance: 53 },
]

const attendanceByTime = [
  { name: "8-10 AM", value: 15 },
  { name: "10-12 PM", value: 30 },
  { name: "12-2 PM", value: 25 },
  { name: "2-4 PM", value: 20 },
  { name: "4-6 PM", value: 10 },
]

// Colors for the charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function DashboardPage() {
  const [timePeriod, setTimePeriod] = useState("last-30-days")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="dashboard" />

      <main className="flex-1">
        {/* Header Section with Animations */}
        <div className="bg-purple-50 py-16 overflow-hidden">
          <div className="container mx-auto px-4 md:px-16 max-w-7xl text-center">
            <h1
              className={`text-4xl font-bold mb-4 transform transition-all duration-1000 ease-out ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              Reports & Analytics
            </h1>
            <p
              className={`text-gray-600 transform transition-all duration-1000 ease-out delay-200 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              Gain insights into event performance, attendance, and resource utilization.
            </p>
          </div>
        </div>

        {/* Dashboard Content with Animation */}
        <div className="container mx-auto px-4 md:px-16 max-w-7xl py-8">
          <div
            className={`flex flex-col md:flex-row justify-between items-center mb-8 transform transition-all duration-1000 ease-out delay-400 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 md:mb-0">Report Dashboard</h2>
            <div className="flex items-center">
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="w-[180px] transition-all duration-200 hover:border-blue-300">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                  <SelectItem value="all-time">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div
            className={`transform transition-all duration-1000 ease-out delay-600 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="events" className="transition-all duration-200">
                  Events
                </TabsTrigger>
                <TabsTrigger value="attendance" className="transition-all duration-200">
                  Attendance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="space-y-8">
                {/* Events Charts - First Row with Staggered Animation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Events by Category */}
                  <div
                    className={`transform transition-all duration-700 ease-out ${
                      isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "800ms" }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle>Events by Category</CardTitle>
                        <CardDescription>Distribution of events by category</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={eventsByCategory}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {eventsByCategory.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Events by Month */}
                  <div
                    className={`transform transition-all duration-700 ease-out ${
                      isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "900ms" }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle>Events by Month</CardTitle>
                        <CardDescription>Number of events per month</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={eventsByMonth}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="events" fill="#0088FE" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Events by Status */}
                  <div
                    className={`transform transition-all duration-700 ease-out ${
                      isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "1000ms" }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle>Events by Status</CardTitle>
                        <CardDescription>Status breakdown of all events</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={eventsByStatus}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {eventsByStatus.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="attendance" className="space-y-8">
                {/* Attendance Charts with Staggered Animation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Attendance by Event Type */}
                  <div
                    className={`transform transition-all duration-700 ease-out ${
                      isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "800ms" }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle>Attendance by Event Type</CardTitle>
                        <CardDescription>Average attendance per event type</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={attendanceByEventType}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="attendance" fill="#00C49F" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Registration vs Attendance */}
                  <div
                    className={`transform transition-all duration-700 ease-out ${
                      isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "900ms" }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle>Registration vs Attendance</CardTitle>
                        <CardDescription>Comparison of registrations to actual attendance</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ChartContainer
                            config={{
                              registrations: {
                                label: "Registrations",
                                color: "hsl(var(--chart-1))",
                              },
                              attendance: {
                                label: "Attendance",
                                color: "hsl(var(--chart-2))",
                              },
                            }}
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={registrationVsAttendance}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Legend />
                                <Bar dataKey="registrations" fill="var(--color-registrations)" />
                                <Bar dataKey="attendance" fill="var(--color-attendance)" />
                              </BarChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Attendance by Time */}
                  <div
                    className={`transform transition-all duration-700 ease-out ${
                      isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "1000ms" }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle>Attendance by Time</CardTitle>
                        <CardDescription>Attendance patterns by time of day</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={attendanceByTime}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {attendanceByTime.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

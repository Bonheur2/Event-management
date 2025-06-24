"use client"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Users, Calendar } from "lucide-react"

// Sample organizer data
const organizers = [
  {
    id: "binary-hub",
    name: "Binary Hub",
    description: "Global leader in innovative solutions for various industries",
    logo: "/binary.png?height=120&width=200&text=BINARY+HUB",
    memberCount: 45,
    eventCount: 12,
    tags: ["Corporate", "Admin"],
  },
  {
    id: "university-of-rwanda",
    name: "University Of Rwanda",
    description: "Top Higher Education Institution in Rwanda",
    logo: "/UR.png?height=120&width=200&text=UNIVERSITY+OF+RWANDA",
    memberCount: 120,
    eventCount: 25,
    tags: ["Corporate", "Member"],
  },
  {
    id: "techstars-incubator",
    name: "TechStars Incubator",
    description: "Supporting early-stage technology startups and entrepreneurs",
    logo: "/techstars.png?height=120&width=200&text=TECHSTARS",
    memberCount: 35,
    eventCount: 8,
    tags: ["Non-profit", "Admin"],
  },
  {
    id: "green-earth-foundation",
    name: "Green Earth Foundation",
    description: "Environmental organization focused on sustainability initiatives",
    logo: "/greenearth.png?height=120&width=200&text=GREEN+EARTH",
    memberCount: 50,
    eventCount: 5,
    tags: ["Non-profit", "Member"],
  },
  {
    id: "city-business-network",
    name: "City Business Network",
    description: "Local business networking and development association",
    logo: "/citybuz.png?height=120&width=200&text=CITY+BUSINESS+NETWORK",
    memberCount: 85,
    eventCount: 4,
    tags: ["Community", "Member"],
  },
  {
    id: "creative-arts-alliance",
    name: "Creative Arts Alliance",
    description: "Supporting and promoting local artists and creative professionals",
    logo: "/creali.png?height=120&width=200&text=CREATIVE+ALLIANCE",
    memberCount: 62,
    eventCount: 7,
    tags: ["Community", "Admin"],
  },
]

export default function OrganizersPage() {
  const [isTypeOpen, setIsTypeOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("Type")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const typeOptions = ["All Types", "Corporate", "Non-profit", "Community"]

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
    setIsTypeOpen(false)
  }

  const getTagClass = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "corporate":
        return "bg-blue-50 text-blue-700"
      case "non-profit":
        return "bg-green-50 text-green-700"
      case "community":
        return "bg-purple-50 text-purple-700"
      case "admin":
        return "bg-gray-50 text-gray-700"
      case "member":
        return "bg-yellow-50 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="organizations" />

      <main className="flex-1">
        {/* Header Section with Animations */}
        <div className="bg-purple-50 py-16 overflow-hidden">
          <div className="container mx-auto px-16 max-w-7xl text-center">
            <h1
              className={`text-4xl font-bold mb-4 transform transition-all duration-1000 ease-out ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              My Organizer
            </h1>
            <p
              className={`text-gray-600 transform transition-all duration-1000 ease-out delay-200 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              Manage your organizers and create new ones to organize events.
            </p>
          </div>
        </div>

        {/* Search and Filters with Animation */}
        <div className="container mx-auto px-16 max-w-7xl py-8 relative z-20">
          <div
            className={`flex flex-col md:flex-row gap-4 items-center transform transition-all duration-1000 ease-out delay-400 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search organizers..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="relative z-30">
              <button
                className="flex items-center justify-between gap-2 border rounded-md px-4 py-2 text-gray-700 bg-white min-w-[160px] hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsTypeOpen(!isTypeOpen)}
              >
                <Filter className="h-4 w-4 mr-1" />
                <span>{selectedType}</span>
                <Filter className="h-4 w-4 ml-auto" />
              </button>

              {isTypeOpen && (
                <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
                  <ul className="py-1">
                    {typeOptions.map((option) => (
                      <li
                        key={option}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm transition-colors duration-150"
                        onClick={() => handleTypeSelect(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Organizers Grid with Staggered Animation */}
        <div className="container mx-auto px-16 max-w-7xl pb-16 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {organizers.map((org, index) => (
              <div
                key={org.id}
                className={`bg-white rounded-lg overflow-hidden shadow transform transition-all duration-700 ease-out hover:shadow-lg hover:-translate-y-1 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: `${600 + index * 100}ms`,
                }}
              >
                <div className="h-48 relative flex items-center justify-center p-4 bg-white">
                  <img
                    src={org.logo || "/placeholder.svg"}
                    alt={org.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {org.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`inline-block px-2 py-1 text-xs font-medium rounded transition-colors duration-200 hover:scale-105 ${getTagClass(
                          tag,
                        )}`}
                        style={{
                          animationDelay: `${800 + index * 100 + tagIndex * 50}ms`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 transition-colors duration-200 hover:text-blue-600">
                    {org.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{org.description}</p>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{org.memberCount} members</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{org.eventCount} events</span>
                    </div>
                  </div>
                  <a
                    href={`/organizers/${org.id}`}
                    className="block w-full text-center py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-all duration-200 hover:border-blue-300 hover:text-blue-600"
                  >
                    View Organizer
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

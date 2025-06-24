"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, LogOut, Calendar, MapPin, Shield } from "lucide-react"
import { useAuth } from "@/components/providers"
import { useRouter } from "next/navigation"

interface HeaderProps {
  activePage?: string
}

export function Header({ activePage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isManageMenuOpen, setIsManageMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { isLoggedIn, user, logout } = useAuth()
  const router = useRouter()

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // Close manage menu if clicking outside
      if (isManageMenuOpen && !target.closest("[data-manage-menu]")) {
        setIsManageMenuOpen(false)
      }

      // Close user menu if clicking outside
      if (isUserMenuOpen && !target.closest("[data-user-menu]")) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isManageMenuOpen, isUserMenuOpen])

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
    router.push("/")
  }

  // Don't render logged-in state until component is mounted
  const showLoggedIn = mounted && isLoggedIn

  // Get user display name and initials
  const userDisplayName = user ? `${user.firstName} ${user.lastName}` : "User"
  const userInitials = user ? `${user.firstName[0]}${user.lastName[0]}` : "U"

  return (
    <header className="border-b">
      <div className="container mx-auto px-16 py-4 max-w-7xl flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded"></div>
          <Link href="/" className="font-bold text-xl">
            EventsMS
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`text-sm font-medium ${
              activePage === "home" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Home
          </Link>
          <Link
            href="/events"
            className={`text-sm font-medium ${
              activePage === "events" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Events
          </Link>
          <Link
            href="/venues"
            className={`text-sm font-medium ${
              activePage === "venues" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Venues
          </Link>
          <Link
            href="/organizers"
            className={`text-sm font-medium ${
              activePage === "organizers" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Organizers
          </Link>
          <Link
            href="/tickets"
            className={`text-sm font-medium ${
              activePage === "tickets" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            My Tickets
          </Link>
        </nav>

        {/* Desktop auth buttons or user menu */}
        {!mounted ? (
          // Show nothing while mounting to prevent hydration mismatch
          <div className="hidden md:block w-[150px]"></div>
        ) : showLoggedIn ? (
          <div className="hidden md:flex items-center space-x-6">
            {/* Manage dropdown */}
            <div className="relative" data-manage-menu>
              <button
                className={`flex items-center space-x-1 text-sm font-medium ${
                  activePage === "manage" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setIsManageMenuOpen(!isManageMenuOpen)}
                aria-expanded={isManageMenuOpen}
                aria-haspopup="true"
              >
                <span>Manage</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Manage dropdown menu */}
              {isManageMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
                  <div className="py-1">
                    {user?.roleId === "role_admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsManageMenuOpen(false)}
                      >
                        <Shield className="h-4 w-4 mr-2 text-gray-500" />
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/manage/events"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsManageMenuOpen(false)}
                    >
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      Manage Events
                    </Link>
                    <Link
                      href="/manage/venues"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsManageMenuOpen(false)}
                    >
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      Manage Venues
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/tickets"
              className={`text-sm font-medium ${
                activePage === "tickets" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              My tickets
            </Link>
            <div className="relative" data-user-menu>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full overflow-hidden flex items-center justify-center text-white text-sm font-medium">
                  {user?.profilePictureURL ? (
                    <img
                      src={user.profilePictureURL || "/placeholder.svg"}
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    userInitials
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{userDisplayName}</span>
                  {user?.roleId === "role_admin" && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Admin</span>
                  )}
                </div>
                <ChevronDown className="h-4 w-4" />
              </div>

              {/* User dropdown menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <Link
                      href="/user-dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className={`text-sm font-medium ${
                activePage === "login" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Log In
            </Link>
            <Link
              href="/register"
              className={`text-sm font-medium text-white bg-gray-900 px-4 py-2 rounded-md hover:bg-gray-800 ${
                activePage === "register" ? "bg-blue-600 hover:bg-blue-700" : ""
              }`}
            >
              Register
            </Link>
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-50 md:hidden">
            <div className="container mx-auto px-16 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className={`text-sm font-medium ${
                    activePage === "home" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/events"
                  className={`text-sm font-medium ${
                    activePage === "events" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Events
                </Link>
                <Link
                  href="/venues"
                  className={`text-sm font-medium ${
                    activePage === "venues" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Venues
                </Link>
                <Link
                  href="/organizers"
                  className={`text-sm font-medium ${
                    activePage === "organizers" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Organizers
                </Link>
                <Link
                  href="/tickets"
                  className={`text-sm font-medium ${
                    activePage === "tickets" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Tickets
                </Link>

                {mounted && showLoggedIn ? (
                  <>
                    {/* Mobile Manage section */}
                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium text-gray-900 mb-2">Manage</p>
                      <div className="pl-2 space-y-2">
                        {user?.roleId === "role_admin" && (
                          <Link
                            href="/admin"
                            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <Shield className="h-4 w-4 mr-2 text-gray-500" />
                            Admin Dashboard
                          </Link>
                        )}
                        <Link
                          href="/manage/events"
                          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          Manage Events
                        </Link>
                        <Link
                          href="/manage/venues"
                          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          Manage Venues
                        </Link>
                      </div>
                    </div>

                    <Link
                      href="/tickets"
                      className={`text-sm font-medium ${
                        activePage === "tickets" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My tickets
                    </Link>
                    <div className="pt-4 border-t">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-blue-500 rounded-full overflow-hidden flex items-center justify-center text-white text-sm font-medium">
                          {user?.profilePictureURL ? (
                            <img
                              src={user.profilePictureURL || "/placeholder.svg"}
                              alt="User avatar"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            userInitials
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{userDisplayName}</span>
                          {user?.roleId === "role_admin" && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Admin</span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Link
                          href="/profile"
                          className="block text-sm text-gray-600 hover:text-gray-900"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          href="/settings"
                          className="block text-sm text-gray-600 hover:text-gray-900"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Settings
                        </Link>
                        <Link
                          href="/user-dashboard"
                          className="block text-sm text-gray-600 hover:text-gray-900"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsMenuOpen(false)
                        }}
                        className="flex items-center text-sm text-red-600 mt-4"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </>
                ) : mounted ? (
                  <div className="pt-4 border-t flex flex-col space-y-4">
                    <Link
                      href="/login"
                      className={`text-sm font-medium ${
                        activePage === "login" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/register"
                      className={`text-sm font-medium text-white bg-gray-900 px-4 py-2 rounded-md hover:bg-gray-800 text-center ${
                        activePage === "register" ? "bg-blue-600 hover:bg-blue-700" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                ) : null}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

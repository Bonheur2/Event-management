"use client"

import { type ReactNode, createContext, useContext, useState, useEffect } from "react"
import { getUserByEmail, getUserByUsername, type User } from "@/data/users"

type AuthContextType = {
  isLoggedIn: boolean
  user: User | null
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

// Create the context with undefined initially
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLoggedIn")
    const storedUser = localStorage.getItem("currentUser")

    if (storedLoginState === "true" && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setIsLoggedIn(true)
        setUser(parsedUser)
      } catch (error) {
        // If parsing fails, clear the stored data
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("currentUser")
      }
    }
    setMounted(true)
  }, [])

  const login = async (identifier: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Try to find user by email first, then by username
    let foundUser = getUserByEmail(identifier)
    if (!foundUser) {
      foundUser = getUserByUsername(identifier)
    }

    // Check if user exists and password matches
    if (!foundUser) {
      return { success: false, error: "User not found. Please check your email/username." }
    }

    if (foundUser.password !== password) {
      return { success: false, error: "Invalid password. Please try again." }
    }

    // Login successful
    setIsLoggedIn(true)
    setUser(foundUser)
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("currentUser", JSON.stringify(foundUser))

    return { success: true }
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUser(null)
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("currentUser")
  }

  // Provide the context value
  const contextValue: AuthContextType = {
    isLoggedIn,
    user,
    login,
    logout,
  }

  // Only render children after mounting on the client
  if (!mounted) {
    return <div>Loading...</div>
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  fullName: string
  email: string
  avatarUrl?: string // Optional: for user's profile picture
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (userData: User, token?: string) => void // token is optional, for session management
  logout: () => void
  checkAuth: () => Promise<void> // Function to check auth status on load
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Start with loading true
  console.log("AuthProvider: State updated - user:", user, "isLoading:", isLoading)
  const router = useRouter()

  // Function to check auth status (e.g., from localStorage or a cookie)
  const checkAuth = async () => {
    setIsLoading(true)
    try {
      // In a real app, you'd verify a token with your backend or check a secure cookie
      // For this example, we'll try to load user from localStorage
      const storedUser = localStorage.getItem("currentUser")
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser)
        // Optionally, verify token validity here if you stored one
        console.log("AuthContext: checkAuth - storedUser parsed:", parsedUser, "Raw storedUser:", storedUser)
        setUser(parsedUser)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Error checking auth status:", error)
      setUser(null) // Ensure user is null on error
    } finally {
      console.log("AuthContext: checkAuth finished - user:", user, "isLoading:", isLoading)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = (userData: User, token?: string) => {
    setIsLoading(true)
    console.log("AuthContext: login function called with userData:", userData)
    setUser(userData)
    localStorage.setItem("currentUser", JSON.stringify(userData)) // Persist user
    if (token) {
      // In a real app, you'd store the token securely (e.g., HttpOnly cookie)
      localStorage.setItem("authToken", token)
    }
    setIsLoading(false)
    // router.push('/'); // Redirect to home or dashboard after login
  }

  const logout = () => {
    setIsLoading(true)
    setUser(null)
    localStorage.removeItem("currentUser")
    localStorage.removeItem("authToken") // Remove token
    setIsLoading(false)
    router.push("/signin") // Redirect to sign-in page after logout
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout, checkAuth }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

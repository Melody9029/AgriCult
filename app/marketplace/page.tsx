// app/marketplace/page.tsx (header section only)
"use client"

import { useUser, useLogin } from "@privy-io/react-auth"
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MarketplacePage() {
  const { user, isLoading } = useUser()
  const { login } = useLogin()
  
  // ... rest of your component

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-green-600">AgriCult</h1>
              <nav className="hidden md:flex space-x-6">
                <Link href="/marketplace" className="text-gray-600 hover:text-green-600">
                  Marketplace
                </Link>
                <Link href="/register-producer" className="text-gray-600 hover:text-green-600">
                  For Producers
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-green-600">
                  About
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              {isLoading ? (
                <div className="h-10 w-28 animate-pulse rounded-md bg-gray-200" />
              ) : user ? (
                <UserAvatarDropdown />
              ) : (
                <>
                  <Button variant="outline" onClick={() => login()}>
                    Sign In
                  </Button>
                  <Button onClick={() => login()}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Rest of your marketplace content */}
    </div>
  )
}
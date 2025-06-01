"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const MarketplacePage = () => {
  const { user, isLoading } = useAuth()

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Discover Premium Organic Products</h1>
          <p className="text-xl mb-8">Bid on high-quality organic products directly from verified producers.</p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for products, producers, or categories..."
                className="w-full pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading marketplace...</p>
          </div>
        ) : user ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Placeholder cards - replace with actual product data */}
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">Premium Organic Product {i}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">High-quality organic product description...</p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to AgriCult</h2>
            <p className="text-gray-600 mb-6">Please sign in to view and participate in auctions.</p>
            <div className="space-x-4">
              <Button variant="outline" asChild>
                <a href="/signin">Sign In</a>
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <a href="/signup">Sign Up</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MarketplacePage

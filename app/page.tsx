"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, TrendingDown, Search, Filter } from "lucide-react"

// Mock data for listings
const mockListings = [
  {
    id: 1,
    title: "Organic Cocoa Beans",
    producer: "Green Valley Farm",
    location: "Ecuador",
    distance: "2.3 km",
    quantity: "500 kg",
    startPrice: 2.5,
    currentPrice: 2.1,
    minPrice: 1.0,
    marketPrice: 2.0,
    timeLeft: 18.5,
    category: "Cocoa",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Premium Coffee Beans",
    producer: "Mountain Peak Coffee",
    location: "Colombia",
    distance: "5.7 km",
    quantity: "200 kg",
    startPrice: 8.0,
    currentPrice: 6.8,
    minPrice: 3.5,
    marketPrice: 7.0,
    timeLeft: 12.3,
    category: "Coffee",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Organic Quinoa",
    producer: "Andean Harvest Co.",
    location: "Peru",
    distance: "8.1 km",
    quantity: "300 kg",
    startPrice: 4.5,
    currentPrice: 3.2,
    minPrice: 2.0,
    marketPrice: 4.0,
    timeLeft: 6.8,
    category: "Grains",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Fair Trade Vanilla Beans",
    producer: "Tropical Spice Farm",
    location: "Madagascar",
    distance: "12.4 km",
    quantity: "50 kg",
    startPrice: 25.0,
    currentPrice: 22.5,
    minPrice: 12.5,
    marketPrice: 25.0,
    timeLeft: 23.1,
    category: "Spices",
    image: "/placeholder.svg?height=200&width=300",
  },
]

function AuctionCard({ listing }: { listing: any }) {
  const [currentPrice, setCurrentPrice] = useState(listing.currentPrice)
  const [timeLeft, setTimeLeft] = useState(listing.timeLeft)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0
        return prev - 0.1
      })

      // Simulate price reduction
      setCurrentPrice((prev) => {
        const priceReduction = (listing.startPrice - listing.minPrice) / (24 * 60 * 6) // Price reduction per 10 seconds
        const newPrice = prev - priceReduction
        return Math.max(newPrice, listing.minPrice)
      })
    }, 10000) // Update every 10 seconds for demo

    return () => clearInterval(interval)
  }, [listing])

  const formatTime = (hours: number) => {
    const h = Math.floor(hours)
    const m = Math.floor((hours - h) * 60)
    return `${h}h ${m}m`
  }

  const priceReductionPercentage = ((listing.startPrice - currentPrice) / listing.startPrice) * 100

  return (
    <Link href={`/auction/${listing.id}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
        <div className="aspect-video relative">
          <img src={listing.image || "/placeholder.svg"} alt={listing.title} className="w-full h-full object-cover" />
          <Badge className="absolute top-2 right-2 bg-red-500">
            <Clock className="w-3 h-3 mr-1" />
            {formatTime(timeLeft)}
          </Badge>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{listing.title}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            {listing.producer} • {listing.location} • {listing.distance}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Quantity:</span>
            <span className="font-medium">{listing.quantity}</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-green-600">${currentPrice.toFixed(2)}/kg</span>
              <div className="text-right">
                <div className="flex items-center text-sm text-red-600">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  {priceReductionPercentage.toFixed(1)}% off
                </div>
                <div className="text-xs text-muted-foreground">Min: ${listing.minPrice}/kg</div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((listing.startPrice - currentPrice) / (listing.startPrice - listing.minPrice)) * 100}%`,
                }}
              />
            </div>

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Start: ${listing.startPrice}</span>
              <span>Market: ${listing.marketPrice}</span>
            </div>
          </div>

          <Button className="w-full" size="lg">
            Place Bid - ${(currentPrice * Number.parseFloat(listing.quantity)).toFixed(2)}
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [sortBy, setSortBy] = useState("time")

  const categories = ["all", "Cocoa", "Coffee", "Grains", "Spices", "Fruits", "Vegetables"]
  const locations = ["all", "Ecuador", "Colombia", "Peru", "Madagascar", "Brazil"]

  const filteredListings = mockListings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.producer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || listing.category === selectedCategory
    const matchesLocation = selectedLocation === "all" || listing.location === selectedLocation

    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-green-600">OrganicAuction</h1>
              <nav className="hidden md:flex space-x-6">
                <Link href="/" className="text-gray-600 hover:text-green-600">
                  Marketplace
                </Link>
                <Link href="/producer" className="text-gray-600 hover:text-green-600">
                  For Producers
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-green-600">
                  About
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Sign In</Button>
              <Button>Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Fresh Organic Produce at Dutch Auction Prices</h2>
          <p className="text-xl mb-8">Watch prices drop every hour. Buy directly from local organic producers.</p>
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for produce, producers, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button size="lg" variant="secondary">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filters:</span>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location === "all" ? "All Locations" : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="time">Time Left</SelectItem>
                <SelectItem value="price">Current Price</SelectItem>
                <SelectItem value="discount">Discount %</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-auto text-sm text-muted-foreground">{filteredListings.length} listings found</div>
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing) => (
            <AuctionCard key={listing.id} listing={listing} />
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No listings found matching your criteria.</p>
            <Button
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedLocation("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">OrganicAuction</h3>
              <p className="text-gray-400">
                Connecting organic producers with conscious consumers through fair Dutch auctions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Buyers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Quality Guarantee
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Shipping Info
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Producers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/producer" className="hover:text-white">
                    Start Selling
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Pricing Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OrganicAuction. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

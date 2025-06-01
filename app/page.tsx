"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, TrendingDown, Search } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

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
      setTimeLeft((prev: number) => {
        if (prev <= 0) return 0
        return prev - 0.1
      })

      // Simulate price reduction
      setCurrentPrice((prev: number) => {
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
      <div className="bg-black rounded-xl overflow-hidden hover:ring-1 hover:ring-white/10 transition-all">
        <div className="aspect-video relative bg-gray-100">
          <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 bg-[#FF3B30] text-white text-[11px] leading-none px-2 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatTime(timeLeft)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2">{listing.title}</h3>
          <div className="flex items-center text-[13px] text-gray-400 mb-4">
            <MapPin className="w-3.5 h-3.5 mr-1.5" />
            {listing.producer} <span className="mx-1.5">•</span> {listing.location} <span className="mx-1.5">•</span> {listing.distance}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[13px]">Quantity:</span>
              <span className="text-[13px]">{listing.quantity}</span>
            </div>

            <div>
              <div className="flex justify-between items-start mb-1">
                <span className="text-[22px] font-bold text-[#00FF85]">${currentPrice.toFixed(2)}/kg</span>
                <div className="text-right">
                  <div className="flex items-center text-[13px] text-[#FF3B30] mb-0.5">
                    <TrendingDown className="w-3.5 h-3.5 mr-1" />
                    {priceReductionPercentage.toFixed(1)}% off
                  </div>
                  <div className="text-[11px] text-gray-500">Min: ${listing.minPrice}/kg</div>
                </div>
              </div>

              <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                <span>Start: ${listing.startPrice}</span>
                <span>Market: ${listing.marketPrice}</span>
              </div>

              <div className="w-full bg-[#1A1A1A] rounded-full h-1">
                <div
                  className="bg-gradient-to-r from-[#FF6B00] via-[#FFB800] to-[#00FF85] h-1 rounded-full transition-all duration-300"
                  style={{
                    width: `${((listing.startPrice - currentPrice) / (listing.startPrice - listing.minPrice)) * 100}%`,
                  }}
                />
              </div>
            </div>

            <Button className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white text-[13px] font-medium h-9 rounded-lg">
              Place Bid - ${(currentPrice * Number.parseFloat(listing.quantity)).toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function MarketplacePage() {
  const { user } = useAuth()
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#16A34A] py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Fresh Organic Produce at Dutch Auction Prices</h1>
          <p className="text-xl text-white/90 mb-8">Watch prices drop every hour. Buy directly from local organic producers.</p>
          <div className="max-w-2xl mx-auto">
            <div className="relative flex">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Search for produce, producers, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-24 h-11 bg-black/25 border-0 text-white placeholder:text-white/60 rounded-lg focus-visible:ring-1 focus-visible:ring-white/30"
                />
                <Button 
                  size="sm" 
                  className="absolute right-1 top-1 bottom-1 bg-black text-white hover:bg-black/90 rounded-md px-4 text-[13px] font-medium"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-3">
              <div className="relative group">
                <button className="min-w-[200px] h-12 px-4 bg-black rounded-2xl text-white text-[15px] font-normal flex items-center justify-between">
                  All Categories
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="relative group">
                <button className="min-w-[200px] h-12 px-4 bg-black rounded-2xl text-white text-[15px] font-normal flex items-center justify-between">
                  All Locations
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="relative group">
                <button className="min-w-[200px] h-12 px-4 bg-black rounded-2xl text-white text-[15px] font-normal flex items-center justify-between">
                  Time Left
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="text-[13px] text-gray-500">{filteredListings.length} listings found</div>
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
              className="mt-4 bg-[#16A34A] hover:bg-[#15803D] text-white"
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
    </div>
  )
}

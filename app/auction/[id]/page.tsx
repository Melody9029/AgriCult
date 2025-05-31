"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, MapPin, TrendingDown, Shield, Truck, Award } from "lucide-react"

// Mock detailed listing data
const mockListing = {
  id: 1,
  title: "Premium Organic Cocoa Beans",
  producer: "Green Valley Farm",
  location: "Guayaquil, Ecuador",
  distance: "2.3 km",
  quantity: 500,
  unit: "kg",
  startPrice: 2.5,
  currentPrice: 2.1,
  minPrice: 1.0,
  marketPrice: 2.0,
  timeLeft: 18.5,
  category: "Cocoa",
  description:
    "Premium organic cocoa beans grown in the fertile valleys of Ecuador. Our beans are carefully harvested at peak ripeness and sun-dried to preserve their rich, complex flavor profile. Perfect for artisanal chocolate making.",
  harvestDate: "2024-01-15",
  certifications: ["Organic", "Fair Trade", "Rainforest Alliance"],
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  producer_info: {
    name: "Green Valley Farm",
    established: "1995",
    size: "150 hectares",
    certifications: ["Organic Certified", "Fair Trade"],
    description: "Family-owned farm specializing in sustainable cocoa production for three generations.",
  },
  shipping: {
    methods: ["Standard Shipping", "Express Delivery", "Local Pickup"],
    cost: "Free shipping on orders over $500",
    time: "3-5 business days",
  },
}

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const [currentPrice, setCurrentPrice] = useState(mockListing.currentPrice)
  const [timeLeft, setTimeLeft] = useState(mockListing.timeLeft)
  const [bidQuantity, setBidQuantity] = useState(100)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0
        return prev - 0.1
      })

      // Simulate price decrease
      setCurrentPrice((prev) => {
        const priceReduction = (mockListing.startPrice - mockListing.minPrice) / (24 * 60 * 6)
        const newPrice = prev - priceReduction
        return Math.max(newPrice, mockListing.minPrice)
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (hours: number) => {
    const h = Math.floor(hours)
    const m = Math.floor((hours - h) * 60)
    const s = Math.floor(((hours - h) * 60 - m) * 60)
    return `${h}h ${m}m ${s}s`
  }

  const priceReductionPercentage = ((mockListing.startPrice - currentPrice) / mockListing.startPrice) * 100
  const totalCost = currentPrice * bidQuantity

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-green-600">
                OrganicAuction
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Sign In</Button>
              <Button>Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-green-600">
            Marketplace
          </Link>
          <span>/</span>
          <span>{mockListing.category}</span>
          <span>/</span>
          <span className="text-gray-900">{mockListing.title}</span>
        </div>

        <Button variant="outline" className="mb-6" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative">
                  <img
                    src={mockListing.images[selectedImage] || "/placeholder.svg"}
                    alt={mockListing.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 right-4 bg-red-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTime(timeLeft)}
                  </Badge>
                </div>
                <div className="flex gap-2 p-4">
                  {mockListing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? "border-green-500" : "border-gray-200"
                      }`}
                    >
                      <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{mockListing.description}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Harvest Date</h4>
                    <p className="text-muted-foreground">{new Date(mockListing.harvestDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Available Quantity</h4>
                    <p className="text-muted-foreground">
                      {mockListing.quantity} {mockListing.unit}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockListing.certifications.map((cert) => (
                      <Badge key={cert} variant="secondary">
                        <Award className="w-3 h-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Producer Information */}
            <Card>
              <CardHeader>
                <CardTitle>About the Producer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xl">GV</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{mockListing.producer_info.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {mockListing.location}
                    </div>
                    <p className="text-muted-foreground">{mockListing.producer_info.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Established:</span> {mockListing.producer_info.established}
                  </div>
                  <div>
                    <span className="font-medium">Farm Size:</span> {mockListing.producer_info.size}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Producer Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockListing.producer_info.certifications.map((cert) => (
                      <Badge key={cert} variant="outline">
                        <Shield className="w-3 h-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Auction Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Current Auction</span>
                  <Badge variant="destructive">Live</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">${currentPrice.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">per {mockListing.unit}</div>
                  <div className="flex items-center justify-center text-sm text-red-600 mt-1">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    {priceReductionPercentage.toFixed(1)}% off starting price
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Time Remaining:</span>
                    <span className="font-medium">{formatTime(timeLeft)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Starting Price:</span>
                    <span>${mockListing.startPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Minimum Price:</span>
                    <span>${mockListing.minPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Market Price:</span>
                    <span>${mockListing.marketPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-red-500 to-green-500 h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${((mockListing.startPrice - currentPrice) / (mockListing.startPrice - mockListing.minPrice)) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                      <polyline points="16 6 12 2 8 6"></polyline>
                      <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                    Share
                  </Button>
                  <Button variant="outline" className="flex-1 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bid Form */}
            <Card>
              <CardHeader>
                <CardTitle>Place Your Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Quantity ({mockListing.unit})</label>
                  <Input
                    type="number"
                    value={bidQuantity}
                    onChange={(e) => setBidQuantity(Number.parseInt(e.target.value) || 0)}
                    min="1"
                    max={mockListing.quantity}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Max available: {mockListing.quantity} {mockListing.unit}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Cost:</span>
                    <span className="text-xl font-bold text-green-600">${totalCost.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Price may decrease before purchase</p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Purchase Now
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">or</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Add to Watchlist
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  By purchasing, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
            {/* Bid History */}
            <Card>
              <CardHeader>
                <CardTitle>Bid History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {[
                    { user: "John D.", time: "2 hours ago", amount: 500, price: 2.2 },
                    { user: "Maria S.", time: "5 hours ago", amount: 200, price: 2.3 },
                    { user: "Alex W.", time: "8 hours ago", amount: 350, price: 2.4 },
                  ].map((bid, i) => (
                    <div key={i} className="flex justify-between items-center text-sm border-b pb-2">
                      <div>
                        <div className="font-medium">{bid.user}</div>
                        <div className="text-xs text-muted-foreground">{bid.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{bid.amount} kg</div>
                        <div className="text-xs text-green-600">${bid.price.toFixed(2)}/kg</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  View All Bids
                </Button>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium">Available Methods:</h4>
                  <ul className="text-sm text-muted-foreground mt-1">
                    {mockListing.shipping.methods.map((method) => (
                      <li key={method}>• {method}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Shipping Cost:</h4>
                  <p className="text-sm text-muted-foreground">{mockListing.shipping.cost}</p>
                </div>
                <div>
                  <h4 className="font-medium">Delivery Time:</h4>
                  <p className="text-sm text-muted-foreground">{mockListing.shipping.time}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quality Guarantee */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Quality Guarantee
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  All products on OrganicAuction are verified for quality and authenticity. If you're not satisfied, we
                  offer a 100% money-back guarantee.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span>Quality Rating:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={star <= 4 ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-500"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img
                    src={`/placeholder.svg?height=200&width=300&query=organic ${
                      i === 1 ? "coffee" : i === 2 ? "quinoa" : "vanilla"
                    } beans`}
                    alt="Related product"
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-red-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {i * 5 + 2}h 30m
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">
                    {i === 1 ? "Organic Coffee Beans" : i === 2 ? "Premium Quinoa" : "Fair Trade Vanilla"}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {i === 1 ? "Colombia" : i === 2 ? "Peru" : "Madagascar"}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-600">${(i * 2 + 3).toFixed(2)}/kg</span>
                    <Link href={`/auction/${i + 2}`}>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

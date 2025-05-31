"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, TrendingUp, Clock, DollarSign } from "lucide-react"

// Mock data for producer's listings
const mockProducerListings = [
  {
    id: 1,
    title: "Organic Cocoa Beans",
    quantity: "500 kg",
    startPrice: 2.5,
    currentPrice: 2.1,
    minPrice: 1.0,
    marketPrice: 2.0,
    timeLeft: 18.5,
    status: "active",
    bids: 12,
    views: 156,
  },
  {
    id: 2,
    title: "Premium Coffee Beans",
    quantity: "200 kg",
    startPrice: 8.0,
    currentPrice: 6.8,
    minPrice: 3.5,
    marketPrice: 7.0,
    timeLeft: 12.3,
    status: "active",
    bids: 8,
    views: 89,
  },
]

function ListingForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    quantity: "",
    unit: "kg",
    startPrice: "",
    marketPrice: "",
    location: "",
    harvestDate: "",
    certifications: [],
  })

  const categories = ["Cocoa", "Coffee", "Grains", "Spices", "Fruits", "Vegetables", "Nuts", "Seeds"]
  const units = ["kg", "lbs", "tons", "bags", "boxes"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const calculateMinPrice = () => {
    const market = Number.parseFloat(formData.marketPrice)
    return market ? (market * 0.5).toFixed(2) : "0.00"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Listing</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Product Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Organic Cocoa Beans"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your product, growing methods, quality, etc."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="500"
                required
              />
            </div>

            <div>
              <Label htmlFor="unit">Unit</Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, Country"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="marketPrice">Current Market Price (per {formData.unit})</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="marketPrice"
                  type="number"
                  step="0.01"
                  value={formData.marketPrice}
                  onChange={(e) => setFormData({ ...formData, marketPrice: e.target.value })}
                  placeholder="2.00"
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This helps us set the minimum auction price (50% of market value)
              </p>
            </div>

            <div>
              <Label htmlFor="startPrice">Starting Auction Price (per {formData.unit})</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="startPrice"
                  type="number"
                  step="0.01"
                  value={formData.startPrice}
                  onChange={(e) => setFormData({ ...formData, startPrice: e.target.value })}
                  placeholder="2.50"
                  className="pl-10"
                  required
                />
              </div>
              {formData.marketPrice && (
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum price will be: ${calculateMinPrice()} per {formData.unit}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="harvestDate">Harvest Date</Label>
            <Input
              id="harvestDate"
              type="date"
              value={formData.harvestDate}
              onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">Create Listing</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function ActiveListings() {
  const formatTime = (hours: number) => {
    const h = Math.floor(hours)
    const m = Math.floor((hours - h) * 60)
    return `${h}h ${m}m`
  }

  return (
    <div className="space-y-4">
      {mockProducerListings.map((listing) => (
        <Card key={listing.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{listing.title}</h3>
                  <Badge variant={listing.status === "active" ? "default" : "secondary"}>{listing.status}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Quantity</p>
                    <p className="font-medium">{listing.quantity}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current Price</p>
                    <p className="font-medium text-green-600">${listing.currentPrice}/kg</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time Left</p>
                    <p className="font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatTime(listing.timeLeft)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Activity</p>
                    <p className="font-medium">
                      {listing.bids} bids • {listing.views} views
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Start: ${listing.startPrice}</span>
                    <span>Min: ${listing.minPrice}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full"
                      style={{
                        width: `${((listing.startPrice - listing.currentPrice) / (listing.startPrice - listing.minPrice)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 ml-4">
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-muted-foreground">+1 from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,450</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Sale Price</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$4.20</div>
          <p className="text-xs text-muted-foreground">+5.2% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ProducerPage() {
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
              <nav className="hidden md:flex space-x-6">
                <Link href="/" className="text-gray-600 hover:text-green-600">
                  Marketplace
                </Link>
                <Link href="/producer" className="text-green-600 font-medium">
                  Producer Dashboard
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Profile</Button>
              <Button>Sign Out</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Producer Dashboard</h1>
          <p className="text-muted-foreground">Manage your organic produce listings and track your sales.</p>
        </div>

        <Dashboard />

        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="listings">Active Listings</TabsTrigger>
            <TabsTrigger value="create">Create Listing</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Active Listings</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Listing
              </Button>
            </div>
            <ActiveListings />
          </TabsContent>

          <TabsContent value="create">
            <ListingForm />
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Filter, Leaf, Star } from "lucide-react"

// Mock producers data
const mockProducers = [
  {
    id: "green-valley",
    name: "Green Valley Farm",
    location: "Guayaquil, Ecuador",
    specialties: ["Cocoa", "Coffee", "Tropical Fruits"],
    certifications: ["Organic Certified", "Fair Trade", "Rainforest Alliance"],
    rating: 4.8,
    reviewCount: 156,
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=300&width=600",
    description:
      "Family-owned organic farm specializing in premium cocoa beans and sustainable farming practices since 1995.",
  },
  {
    id: "mountain-peak",
    name: "Mountain Peak Coffee",
    location: "Bogotá, Colombia",
    specialties: ["Coffee", "Cacao", "Honey"],
    certifications: ["Organic Certified", "Fair Trade"],
    rating: 4.7,
    reviewCount: 124,
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=300&width=600",
    description:
      "High-altitude coffee farm producing specialty grade arabica beans with unique flavor profiles from the Colombian Andes.",
  },
  {
    id: "andean-harvest",
    name: "Andean Harvest Co.",
    location: "Cusco, Peru",
    specialties: ["Quinoa", "Amaranth", "Andean Grains"],
    certifications: ["Organic Certified", "B Corp"],
    rating: 4.9,
    reviewCount: 89,
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=300&width=600",
    description:
      "Cooperative of indigenous farmers preserving traditional farming methods while producing premium Andean superfoods.",
  },
  {
    id: "tropical-spice",
    name: "Tropical Spice Farm",
    location: "Antananarivo, Madagascar",
    specialties: ["Vanilla", "Cinnamon", "Cloves"],
    certifications: ["Organic Certified", "Fair Trade"],
    rating: 4.6,
    reviewCount: 72,
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=300&width=600",
    description:
      "Specializing in premium vanilla beans and exotic spices grown using traditional methods in Madagascar's rich soil.",
  },
  {
    id: "amazon-fruits",
    name: "Amazon Fruits Collective",
    location: "Manaus, Brazil",
    specialties: ["Açaí", "Guarana", "Tropical Fruits"],
    certifications: ["Organic Certified", "Rainforest Alliance"],
    rating: 4.5,
    reviewCount: 63,
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=300&width=600",
    description:
      "Cooperative of small-scale farmers harvesting and processing native Amazonian superfruits using sustainable methods.",
  },
  {
    id: "olive-grove",
    name: "Mediterranean Olive Grove",
    location: "Kalamata, Greece",
    specialties: ["Olive Oil", "Olives", "Mediterranean Herbs"],
    certifications: ["Organic Certified", "Protected Designation of Origin"],
    rating: 4.9,
    reviewCount: 118,
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=300&width=600",
    description:
      "Family-owned olive grove producing premium extra virgin olive oil from centuries-old trees using traditional methods.",
  },
]

export default function ProducersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedCertification, setSelectedCertification] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  const specialties = ["all", "Cocoa", "Coffee", "Quinoa", "Vanilla", "Tropical Fruits", "Olive Oil"]
  const certifications = ["all", "Organic Certified", "Fair Trade", "Rainforest Alliance", "B Corp"]

  const filteredProducers = mockProducers.filter((producer) => {
    const matchesSearch =
      producer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producer.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialty = selectedSpecialty === "all" || producer.specialties.includes(selectedSpecialty)
    const matchesCertification =
      selectedCertification === "all" || producer.certifications.includes(selectedCertification)

    return matchesSearch && matchesSpecialty && matchesCertification
  })

  // Sort producers
  const sortedProducers = [...filteredProducers].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "reviews") return b.reviewCount - a.reviewCount
    // Default to alphabetical
    return a.name.localeCompare(b.name)
  })

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
                <Link href="/producers" className="text-green-600 font-medium">
                  Producers
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
          <h2 className="text-4xl font-bold mb-4">Meet Our Organic Producers</h2>
          <p className="text-xl mb-8">Discover the passionate farmers and producers behind our organic products</p>
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for producers by name, location, or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/90"
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

            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty === "all" ? "All Specialties" : specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCertification} onValueChange={setSelectedCertification}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Certification" />
              </SelectTrigger>
              <SelectContent>
                {certifications.map((certification) => (
                  <SelectItem key={certification} value={certification}>
                    {certification === "all" ? "All Certifications" : certification}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rating</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="name">Alphabetical</SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-auto text-sm text-muted-foreground">{sortedProducers.length} producers found</div>
          </div>
        </div>
      </section>

      {/* Producers Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducers.map((producer) => (
            <Link href={`/producer/${producer.id}`} key={producer.id}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <div className="aspect-video relative">
                  <img
                    src={producer.coverImage || "/placeholder.svg"}
                    alt={producer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white bg-white shadow-sm">
                      <img
                        src={producer.image || "/placeholder.svg"}
                        alt={producer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{producer.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {producer.location}
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 font-medium">{producer.rating}</span>
                        </div>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-muted-foreground">{producer.reviewCount} reviews</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{producer.description}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {producer.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {producer.certifications.map((certification) => (
                        <Badge key={certification} variant="outline" className="flex items-center gap-1 text-xs">
                          <Leaf className="w-3 h-3" />
                          {certification}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {sortedProducers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No producers found matching your criteria.</p>
            <Button
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setSelectedSpecialty("all")
                setSelectedCertification("all")
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

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Calendar,
  Award,
  Star,
  Mail,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Clock,
  TrendingDown,
  Leaf,
  Users,
  Truck,
  CheckCircle,
  ThumbsUp,
  ArrowLeft,
} from "lucide-react"

// Mock producer data
const mockProducer = {
  id: "green-valley",
  name: "Green Valley Farm",
  tagline: "Sustainable organic farming since 1995",
  location: {
    address: "Guayaquil, Ecuador",
    coordinates: { lat: -2.1894, lng: -79.8891 },
    region: "Coastal Ecuador",
  },
  established: "1995",
  size: "150 hectares",
  employees: "45 local workers",
  description:
    "Green Valley Farm is a family-owned organic farm located in the lush coastal region of Ecuador. For three generations, our family has been dedicated to sustainable farming practices that respect the land and produce exceptional quality organic cocoa beans. Our farm is nestled between the Andes mountains and the Pacific coast, creating a unique microclimate that's perfect for growing premium cocoa.\n\nWe work directly with local communities, employing over 45 local workers with fair wages and providing educational opportunities for their families. Our commitment to sustainability extends beyond organic farming – we've implemented water conservation systems, solar power, and maintain 30% of our land as protected forest to preserve local biodiversity.",
  specialties: ["Organic Cocoa Beans", "Coffee", "Tropical Fruits"],
  certifications: [
    {
      name: "Organic Certified",
      year: "2001",
      authority: "USDA Organic",
      icon: "leaf",
    },
    {
      name: "Fair Trade",
      year: "2005",
      authority: "Fair Trade International",
      icon: "users",
    },
    {
      name: "Rainforest Alliance",
      year: "2010",
      authority: "Rainforest Alliance",
      icon: "leaf",
    },
    {
      name: "Carbon Neutral",
      year: "2018",
      authority: "Carbon Trust",
      icon: "leaf",
    },
  ],
  farmingPractices: [
    "Organic pest management using beneficial insects",
    "Composting and natural fertilizers",
    "Shade-grown cultivation to protect biodiversity",
    "Water conservation and rainwater harvesting",
    "Solar-powered processing facilities",
    "Zero-waste packaging initiatives",
  ],
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  contact: {
    email: "info@greenvalleyfarm.com",
    phone: "+593 98 765 4321",
    website: "www.greenvalleyfarm.com",
    social: {
      instagram: "@greenvalleyfarm",
      facebook: "greenvalleyfarm",
      twitter: "@greenvalley",
    },
  },
  stats: {
    averageRating: 4.8,
    reviewCount: 156,
    completedSales: 342,
    responseTime: "Within 24 hours",
    memberSince: "January 2023",
    repeatBuyers: "78%",
  },
  activeListings: [
    {
      id: 1,
      title: "Premium Organic Cocoa Beans",
      quantity: "500 kg",
      startPrice: 2.5,
      currentPrice: 2.1,
      minPrice: 1.0,
      timeLeft: 18.5,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Organic Coffee Beans",
      quantity: "200 kg",
      startPrice: 8.0,
      currentPrice: 6.8,
      minPrice: 3.5,
      timeLeft: 12.3,
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  pastListings: [
    {
      id: 101,
      title: "Organic Cocoa Beans - Premium Grade",
      quantity: "350 kg",
      soldPrice: 2.3,
      soldDate: "2024-04-15",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 102,
      title: "Organic Coffee Beans - Arabica",
      quantity: "150 kg",
      soldPrice: 7.2,
      soldDate: "2024-03-22",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 103,
      title: "Organic Tropical Fruit Assortment",
      quantity: "400 kg",
      soldPrice: 3.8,
      soldDate: "2024-02-18",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  reviews: [
    {
      id: 1,
      user: "Artisanal Chocolates Co.",
      rating: 5,
      date: "2024-04-20",
      comment:
        "The cocoa beans from Green Valley Farm are exceptional. The complex flavor profile is perfect for our single-origin chocolate bars. Consistent quality and reliable shipping.",
      product: "Premium Organic Cocoa Beans",
    },
    {
      id: 2,
      user: "Specialty Coffee Roasters",
      rating: 5,
      date: "2024-03-28",
      comment:
        "We've been sourcing coffee beans from Green Valley for over a year now. Their commitment to quality and sustainability aligns perfectly with our brand values. Our customers love the rich flavor profile.",
      product: "Organic Coffee Beans - Arabica",
    },
    {
      id: 3,
      user: "Organic Market NYC",
      rating: 4,
      date: "2024-02-25",
      comment:
        "Great quality produce and reliable shipping. The tropical fruit assortment was fresh and flavorful. Would definitely order again.",
      product: "Organic Tropical Fruit Assortment",
    },
  ],
  story: {
    timeline: [
      {
        year: "1995",
        title: "Farm Established",
        description:
          "Green Valley Farm was established by the Rodriguez family with a commitment to sustainable farming practices.",
      },
      {
        year: "2001",
        title: "Organic Certification",
        description: "Received USDA Organic certification after transitioning to fully organic farming methods.",
      },
      {
        year: "2005",
        title: "Fair Trade Certification",
        description:
          "Committed to fair labor practices and received Fair Trade certification, ensuring fair wages for all workers.",
      },
      {
        year: "2010",
        title: "Rainforest Alliance",
        description:
          "Joined the Rainforest Alliance to further our commitment to biodiversity and environmental protection.",
      },
      {
        year: "2015",
        title: "Expansion & Innovation",
        description:
          "Expanded to 150 hectares and implemented solar-powered processing facilities and water conservation systems.",
      },
      {
        year: "2018",
        title: "Carbon Neutral",
        description:
          "Achieved carbon neutrality through sustainable practices and investment in carbon offset projects.",
      },
      {
        year: "2023",
        title: "Joined OrganicAuction",
        description:
          "Began selling directly to global buyers through OrganicAuction to create more transparent supply chains.",
      },
    ],
  },
}

function ProducerHeader() {
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-green-600 to-green-700 rounded-lg overflow-hidden">
        <img
          src="/placeholder.svg?height=300&width=1200"
          alt="Farm landscape"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Profile Section */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 md:-mt-20 relative z-10">
          {/* Profile Image */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white bg-white shadow-lg">
            <img
              src="/placeholder.svg?height=200&width=200"
              alt={mockProducer.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Producer Info */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{mockProducer.name}</h1>
                <p className="text-muted-foreground">{mockProducer.tagline}</p>
                <div className="flex items-center mt-2 text-sm">
                  <MapPin className="w-4 h-4 mr-1 text-green-600" />
                  <span>{mockProducer.location.address}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {mockProducer.certifications.slice(0, 3).map((cert) => (
                  <Badge key={cert.name} variant="outline" className="flex items-center gap-1 py-1.5">
                    <Leaf className="w-3.5 h-3.5" />
                    {cert.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProducerStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card>
        <CardContent className="p-4 text-center">
          <Star className="w-5 h-5 mx-auto mb-1 text-yellow-500" />
          <div className="text-2xl font-bold">{mockProducer.stats.averageRating}</div>
          <p className="text-xs text-muted-foreground">Rating</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <ThumbsUp className="w-5 h-5 mx-auto mb-1 text-green-600" />
          <div className="text-2xl font-bold">{mockProducer.stats.reviewCount}</div>
          <p className="text-xs text-muted-foreground">Reviews</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <CheckCircle className="w-5 h-5 mx-auto mb-1 text-green-600" />
          <div className="text-2xl font-bold">{mockProducer.stats.completedSales}</div>
          <p className="text-xs text-muted-foreground">Sales</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <Clock className="w-5 h-5 mx-auto mb-1 text-green-600" />
          <div className="text-sm font-bold">{mockProducer.stats.responseTime}</div>
          <p className="text-xs text-muted-foreground">Response Time</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <Calendar className="w-5 h-5 mx-auto mb-1 text-green-600" />
          <div className="text-sm font-bold">{mockProducer.stats.memberSince}</div>
          <p className="text-xs text-muted-foreground">Member Since</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <Users className="w-5 h-5 mx-auto mb-1 text-green-600" />
          <div className="text-2xl font-bold">{mockProducer.stats.repeatBuyers}</div>
          <p className="text-xs text-muted-foreground">Repeat Buyers</p>
        </CardContent>
      </Card>
    </div>
  )
}

function ActiveListings() {
  const formatTime = (hours: number) => {
    const h = Math.floor(hours)
    const m = Math.floor((hours - h) * 60)
    return `${h}h ${m}m`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockProducer.activeListings.map((listing) => (
        <Link href={`/auction/${listing.id}`} key={listing.id}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
            <div className="aspect-video relative">
              <img
                src={listing.image || "/placeholder.svg"}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-red-500">
                <Clock className="w-3 h-3 mr-1" />
                {formatTime(listing.timeLeft)}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{listing.title}</h3>
              <div className="flex justify-between items-center text-sm mb-3">
                <span>Quantity: {listing.quantity}</span>
                <span className="flex items-center text-red-600">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  {(((listing.startPrice - listing.currentPrice) / listing.startPrice) * 100).toFixed(1)}% off
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">${listing.currentPrice.toFixed(2)}/kg</span>
                <Button size="sm">View Auction</Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function PastListings() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockProducer.pastListings.map((listing) => (
        <Card key={listing.id} className="overflow-hidden h-full">
          <div className="aspect-video">
            <img src={listing.image || "/placeholder.svg"} alt={listing.title} className="w-full h-full object-cover" />
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">{listing.title}</h3>
            <div className="flex justify-between items-center text-sm mb-3">
              <span>Quantity: {listing.quantity}</span>
              <span className="text-muted-foreground">Sold: {new Date(listing.soldDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-600">${listing.soldPrice.toFixed(2)}/kg</span>
              <Badge variant="outline">Completed</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function Reviews() {
  return (
    <div className="space-y-6">
      {mockProducer.reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">{review.user}</div>
                <div className="text-sm text-muted-foreground mb-1">Purchased: {review.product}</div>
              </div>
              <div className="flex items-center">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
              </div>
            </div>
            <p className="mt-3 text-gray-700">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
      <div className="text-center">
        <Button variant="outline">View All Reviews</Button>
      </div>
    </div>
  )
}

function Timeline() {
  return (
    <div className="relative border-l border-gray-200 ml-4 pl-8 py-4 space-y-10">
      {mockProducer.story.timeline.map((event, index) => (
        <div key={index} className="relative">
          <div className="absolute -left-12 mt-1.5 h-6 w-6 rounded-full bg-green-100 border border-green-600 flex items-center justify-center">
            <span className="text-green-600 text-xs font-bold">{index + 1}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold flex items-center">
              <span className="text-green-600 mr-2">{event.year}</span>
              {event.title}
            </h3>
            <p className="mt-1 text-muted-foreground">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      <div className="aspect-video rounded-lg overflow-hidden">
        <img
          src={mockProducer.images[selectedImage] || "/placeholder.svg"}
          alt="Farm gallery"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-6 gap-2">
        {mockProducer.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square rounded-md overflow-hidden border-2 ${
              selectedImage === index ? "border-green-500" : "border-transparent"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

function FarmingPractices() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mockProducer.farmingPractices.map((practice, index) => (
        <Card key={index}>
          <CardContent className="p-4 flex items-start">
            <div className="mr-3 mt-1 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
              <Leaf className="h-3 w-3 text-green-600" />
            </div>
            <p>{practice}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function CertificationDetails() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockProducer.certifications.map((cert) => (
        <Card key={cert.name}>
          <CardContent className="p-6 flex items-start">
            <div className="mr-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              {cert.icon === "leaf" ? (
                <Leaf className="h-6 w-6 text-green-600" />
              ) : cert.icon === "users" ? (
                <Users className="h-6 w-6 text-green-600" />
              ) : (
                <Award className="h-6 w-6 text-green-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold">{cert.name}</h3>
              <p className="text-sm text-muted-foreground">
                {cert.authority} • Certified since {cert.year}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ContactInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-3 text-green-600" />
            <span>{mockProducer.contact.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 mr-3 text-green-600" />
            <span>{mockProducer.contact.phone}</span>
          </div>
          <div className="flex items-center">
            <Globe className="w-5 h-5 mr-3 text-green-600" />
            <a
              href={`https://${mockProducer.contact.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              {mockProducer.contact.website}
            </a>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <Button variant="outline" size="icon">
              <Instagram className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Farm Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
            <img
              src={`/placeholder.svg?height=300&width=600&query=map of ${mockProducer.location.address}`}
              alt="Farm location map"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4">
            <h4 className="font-medium">Address</h4>
            <p className="text-muted-foreground">
              Green Valley Farm
              <br />
              Coastal Region
              <br />
              {mockProducer.location.address}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ProducerProfilePage({ params }: { params: { id: string } }) {
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
          <Link href="/producers" className="hover:text-green-600">
            Producers
          </Link>
          <span>/</span>
          <span className="text-gray-900">{mockProducer.name}</span>
        </div>

        <Button variant="outline" className="mb-6" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Link>
        </Button>

        {/* Producer Header */}
        <ProducerHeader />

        {/* Producer Stats */}
        <div className="mt-8">
          <ProducerStats />
        </div>

        {/* Main Content */}
        <div className="mt-8">
          <Tabs defaultValue="about" className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-7 w-full">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="story">Our Story</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>About {mockProducer.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                      <p className="whitespace-pre-line">{mockProducer.description}</p>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div>
                          <h4 className="font-medium">Established</h4>
                          <p className="text-muted-foreground">{mockProducer.established}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Farm Size</h4>
                          <p className="text-muted-foreground">{mockProducer.size}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Employees</h4>
                          <p className="text-muted-foreground">{mockProducer.employees}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Region</h4>
                          <p className="text-muted-foreground">{mockProducer.location.region}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Specialties</h4>
                      <div className="space-y-2">
                        {mockProducer.specialties.map((specialty) => (
                          <Badge key={specialty} className="mr-2 mb-2">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <Separator className="my-6" />
                      <h4 className="font-medium mb-3">Sustainable Practices</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Leaf className="w-4 h-4 mr-2 text-green-600" />
                          <span>Organic Farming</span>
                        </div>
                        <div className="flex items-center">
                          <Truck className="w-4 h-4 mr-2 text-green-600" />
                          <span>Carbon Neutral Shipping</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-green-600" />
                          <span>Fair Labor Practices</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sustainable Farming Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <FarmingPractices />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Active Auctions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ActiveListings />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Past Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <PastListings />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certifications">
              <Card>
                <CardHeader>
                  <CardTitle>Certifications & Standards</CardTitle>
                </CardHeader>
                <CardContent>
                  <CertificationDetails />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gallery">
              <Card>
                <CardHeader>
                  <CardTitle>Farm Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <PhotoGallery />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Buyer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <Reviews />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="story">
              <Card>
                <CardHeader>
                  <CardTitle>Our Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <Timeline />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <ContactInfo />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

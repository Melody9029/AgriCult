"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import {
  ArrowLeft,
  CalendarIcon,
  DollarSign,
  HelpCircle,
  ImageIcon,
  Info,
  Leaf,
  Save,
  Truck,
  Upload,
  X,
  AlertCircle,
  CheckCircle,
  Eye,
} from "lucide-react"

interface ListingFormData {
  // Basic Information
  title: string
  description: string
  category: string
  subcategory: string
  harvestDate: Date | undefined
  origin: {
    country: string
    region: string
    farm: string
  }

  // Product Details
  quantity: string
  unit: string
  grade: string
  processingMethod: string
  certifications: string[]
  attributes: string[]
  qualityDescription: string

  // Auction Settings
  marketPrice: string
  startingPrice: string
  minimumPrice: string
  auctionDuration: string
  scheduledStart: Date | undefined
  autoRenew: boolean
  reserveQuantity: boolean
  reserveQuantityAmount: string

  // Images & Media
  images: File[]
  certificateFiles: File[]
  qualityReportFiles: File[]

  // Shipping & Logistics
  shippingMethods: string[]
  shippingCost: string
  shippingNotes: string
  packagingType: string
  estimatedShippingTime: string
  shippingRestrictions: string[]

  // Terms & Conditions
  termsAccepted: boolean
  refundPolicy: string
  additionalTerms: string
}

const initialFormData: ListingFormData = {
  title: "",
  description: "",
  category: "",
  subcategory: "",
  harvestDate: undefined,
  origin: {
    country: "",
    region: "",
    farm: "",
  },
  quantity: "",
  unit: "kg",
  grade: "",
  processingMethod: "",
  certifications: [],
  attributes: [],
  qualityDescription: "",
  marketPrice: "",
  startingPrice: "",
  minimumPrice: "",
  auctionDuration: "24",
  scheduledStart: undefined,
  autoRenew: false,
  reserveQuantity: false,
  reserveQuantityAmount: "",
  images: [],
  certificateFiles: [],
  qualityReportFiles: [],
  shippingMethods: [],
  shippingCost: "",
  shippingNotes: "",
  packagingType: "",
  estimatedShippingTime: "",
  shippingRestrictions: [],
  termsAccepted: false,
  refundPolicy: "",
  additionalTerms: "",
}

const categories = [
  {
    name: "Cocoa & Chocolate",
    subcategories: ["Cocoa Beans", "Cocoa Butter", "Cocoa Powder", "Chocolate Products"],
  },
  {
    name: "Coffee",
    subcategories: ["Green Coffee Beans", "Roasted Coffee", "Specialty Coffee", "Coffee By-products"],
  },
  {
    name: "Grains & Cereals",
    subcategories: ["Quinoa", "Amaranth", "Rice", "Oats", "Barley", "Other Grains"],
  },
  {
    name: "Spices",
    subcategories: ["Vanilla", "Cinnamon", "Pepper", "Turmeric", "Cardamom", "Other Spices"],
  },
  {
    name: "Fruits",
    subcategories: ["Fresh Fruits", "Dried Fruits", "Frozen Fruits", "Fruit Powders"],
  },
  {
    name: "Vegetables",
    subcategories: ["Fresh Vegetables", "Dried Vegetables", "Frozen Vegetables"],
  },
  {
    name: "Nuts & Seeds",
    subcategories: ["Almonds", "Cashews", "Chia Seeds", "Flax Seeds", "Other Nuts & Seeds"],
  },
  {
    name: "Oils & Fats",
    subcategories: ["Olive Oil", "Coconut Oil", "Avocado Oil", "Other Oils"],
  },
  {
    name: "Superfoods",
    subcategories: ["Açaí", "Maca", "Spirulina", "Other Superfoods"],
  },
  {
    name: "Herbs & Botanicals",
    subcategories: ["Medicinal Herbs", "Culinary Herbs", "Tea Herbs"],
  },
  {
    name: "Sweeteners",
    subcategories: ["Honey", "Maple Syrup", "Coconut Sugar", "Other Natural Sweeteners"],
  },
]

const certificationOptions = [
  "USDA Organic",
  "EU Organic",
  "Fair Trade",
  "Rainforest Alliance",
  "Bird Friendly",
  "Demeter Biodynamic",
  "Non-GMO Project Verified",
  "Kosher",
  "Halal",
  "Gluten-Free",
]

const attributeOptions = [
  "Single Origin",
  "Shade Grown",
  "Hand Harvested",
  "Sun Dried",
  "Small Batch",
  "Heirloom Variety",
  "Direct Trade",
  "Women Produced",
  "Indigenous Produced",
  "Carbon Neutral",
]

const shippingMethodOptions = [
  "Standard Shipping",
  "Express Shipping",
  "Local Pickup",
  "Freight Shipping",
  "Container Shipping",
  "Air Freight",
]

const packagingOptions = [
  "Jute Bags",
  "Cotton Bags",
  "Paper Bags",
  "Vacuum Sealed",
  "Plastic-Free",
  "Bulk Containers",
  "Wooden Crates",
  "Cardboard Boxes",
]

const shippingRestrictionOptions = [
  "No International Shipping",
  "No Air Freight",
  "Temperature Controlled Only",
  "Certain Countries Excluded",
  "Minimum Order Required",
]

const refundPolicyOptions = [
  "Full refund if quality doesn't match description",
  "Partial refund for minor quality issues",
  "Replacement only for damaged goods",
  "No refunds after shipping",
  "Case-by-case evaluation",
]

function FileUpload({
  label,
  accept,
  multiple = false,
  files,
  onChange,
  helpText,
}: {
  label: string
  accept: string
  multiple?: boolean
  files: File[]
  onChange: (files: File[]) => void
  helpText?: string
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (multiple) {
      onChange([...files, ...selectedFiles])
    } else {
      onChange(selectedFiles)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    onChange(newFiles)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label className="text-sm font-medium">{label}</Label>
        {helpText && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 text-sm">{helpText}</PopoverContent>
          </Popover>
        )}
      </div>
      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <label htmlFor={`file-${label}`} className="cursor-pointer">
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Click to upload {multiple ? "files" : "file"}
            </span>
            <span className="mt-1 block text-xs text-gray-500">{accept.split(",").join(", ")} up to 10MB each</span>
          </label>
          <input
            id={`file-${label}`}
            type="file"
            className="sr-only"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
          />
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm truncate">{file.name}</span>
              <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MultiSelect({
  options,
  selected,
  onChange,
  label,
  helpText,
}: {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  label: string
  helpText?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label className="text-sm font-medium">{label}</Label>
        {helpText && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 text-sm">{helpText}</PopoverContent>
          </Popover>
        )}
      </div>
      <div className="relative">
        <Button type="button" variant="outline" className="w-full justify-between" onClick={() => setIsOpen(!isOpen)}>
          {selected.length > 0 ? `${selected.length} selected` : "Select options"}
        </Button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option}
                className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleOption(option)}
              >
                <Checkbox checked={selected.includes(option)} onChange={() => {}} className="mr-2" />
                <span className="text-sm">{option}</span>
              </div>
            ))}
          </div>
        )}

        {selected.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {selected.map((item) => (
              <Badge key={item} variant="secondary" className="text-xs">
                {item}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-1 h-auto p-0"
                  onClick={() => toggleOption(item)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function CreateListingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ListingFormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState("basic")
  const [previewMode, setPreviewMode] = useState(false)
  const [calculatedMinPrice, setCalculatedMinPrice] = useState<string | null>(null)

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => {
      // Handle nested fields
      if (field.includes(".")) {
        const [parent, child] = field.split(".")
        const parentValue = prev[parent as keyof ListingFormData]
        if (typeof parentValue === 'object' && parentValue !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentValue,
              [child]: value,
            },
          }
        }
      }
      return { ...prev, [field]: value }
    })

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  // Calculate minimum price (50% of market price)
  const calculateMinPrice = () => {
    if (formData.marketPrice) {
      const marketPrice = Number.parseFloat(formData.marketPrice)
      if (!isNaN(marketPrice)) {
        const minPrice = (marketPrice * 0.5).toFixed(2)
        setCalculatedMinPrice(minPrice)
        updateFormData("minimumPrice", minPrice)
      }
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Basic Information
    if (!formData.title) newErrors.title = "Product title is required"
    if (!formData.description) newErrors.description = "Description is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.origin.country) newErrors["origin.country"] = "Country of origin is required"

    // Product Details
    if (!formData.quantity) newErrors.quantity = "Quantity is required"
    if (!formData.unit) newErrors.unit = "Unit is required"

    // Auction Settings
    if (!formData.marketPrice) newErrors.marketPrice = "Market price is required"
    if (!formData.startingPrice) newErrors.startingPrice = "Starting price is required"
    if (!formData.minimumPrice) newErrors.minimumPrice = "Minimum price is required"
    if (formData.reserveQuantity && !formData.reserveQuantityAmount)
      newErrors.reserveQuantityAmount = "Reserve quantity amount is required"

    // Images
    if (formData.images.length === 0) newErrors.images = "At least one product image is required"

    // Terms
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted:", formData)
      // Here you would typically send the data to your backend
      alert("Listing created successfully! Your auction will start as scheduled.")
      router.push("/producer")
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0]
      const element = document.getElementById(firstErrorField)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  const handleSaveDraft = () => {
    // Save as draft logic
    console.log("Saved as draft:", formData)
    alert("Listing saved as draft.")
  }

  const getSubcategories = () => {
    const selectedCategory = categories.find((cat) => cat.name === formData.category)
    return selectedCategory ? selectedCategory.subcategories : []
  }

  const renderPreview = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Listing Preview</CardTitle>
            <CardDescription>This is how your listing will appear to buyers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Product Images */}
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              {formData.images.length > 0 ? (
                <div className="w-full h-full relative">
                  <img
                    src={URL.createObjectURL(formData.images[0]) || "/placeholder.svg"}
                    alt={formData.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
                  <p className="text-sm text-gray-500 mt-2">No images uploaded</p>
                </div>
              )}
            </div>

            {/* Product Title & Basic Info */}
            <div>
              <h2 className="text-2xl font-bold">{formData.title || "Product Title"}</h2>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <span>{formData.origin.farm || "Farm Name"}</span>
                <span className="mx-2">•</span>
                <span>
                  {formData.origin.region ? `${formData.origin.region}, ` : ""}
                  {formData.origin.country || "Country"}
                </span>
              </div>
            </div>

            {/* Certifications */}
            {formData.certifications.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.certifications.map((cert) => (
                  <Badge key={cert} variant="outline" className="flex items-center gap-1">
                    <Leaf className="w-3.5 h-3.5" />
                    {cert}
                  </Badge>
                ))}
              </div>
            )}

            {/* Auction Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm text-muted-foreground">Current Price</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${formData.startingPrice || "0.00"}/{formData.unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Quantity Available</p>
                  <p className="text-lg font-semibold">
                    {formData.quantity || "0"} {formData.unit}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Starting Price:</span>
                  <span>${formData.startingPrice || "0.00"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Minimum Price:</span>
                  <span>${formData.minimumPrice || "0.00"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Market Price:</span>
                  <span>${formData.marketPrice || "0.00"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Auction Duration:</span>
                  <span>{formData.auctionDuration} hours</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full" style={{ width: "0%" }} />
              </div>
            </div>

            {/* Product Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {formData.description || "No description provided."}
              </p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Grade</h4>
                <p className="text-muted-foreground">{formData.grade || "Not specified"}</p>
              </div>
              <div>
                <h4 className="font-medium">Processing Method</h4>
                <p className="text-muted-foreground">{formData.processingMethod || "Not specified"}</p>
              </div>
              <div>
                <h4 className="font-medium">Harvest Date</h4>
                <p className="text-muted-foreground">
                  {formData.harvestDate ? format(formData.harvestDate, "PPP") : "Not specified"}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Attributes</h4>
                <p className="text-muted-foreground">
                  {formData.attributes.length > 0 ? formData.attributes.join(", ") : "None specified"}
                </p>
              </div>
            </div>

            {/* Shipping Info */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Truck className="w-4 h-4 mr-2" />
                Shipping Information
              </h3>
              <div className="space-y-2">
                <div>
                  <h4 className="font-medium">Shipping Methods</h4>
                  <p className="text-muted-foreground">
                    {formData.shippingMethods.length > 0 ? formData.shippingMethods.join(", ") : "Not specified"}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Shipping Cost</h4>
                  <p className="text-muted-foreground">{formData.shippingCost || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="font-medium">Estimated Shipping Time</h4>
                  <p className="text-muted-foreground">{formData.estimatedShippingTime || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="font-medium">Packaging</h4>
                  <p className="text-muted-foreground">{formData.packagingType || "Not specified"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-green-600">
                AgriCult
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/producer">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Auction Listing</h1>
          <p className="text-muted-foreground">
            List your organic products for Dutch auction. Prices will automatically decrease over time until sold or
            reaching the minimum price.
          </p>
        </div>

        {/* Preview Toggle */}
        <div className="flex justify-end mb-6">
          <Button
            variant={previewMode ? "default" : "outline"}
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? "Edit Listing" : "Preview Listing"}
          </Button>
        </div>

        {previewMode ? (
          renderPreview()
        ) : (
          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Product Details</TabsTrigger>
                <TabsTrigger value="auction">Auction Settings</TabsTrigger>
                <TabsTrigger value="images">Images & Media</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="terms">Terms</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Provide essential information about your product</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Product Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => updateFormData("title", e.target.value)}
                        placeholder="e.g., Premium Organic Cocoa Beans"
                      />
                      {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                    </div>

                    <div>
                      <Label htmlFor="description">Product Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => updateFormData("description", e.target.value)}
                        placeholder="Describe your product in detail, including quality, flavor profile, growing conditions, etc."
                        rows={5}
                      />
                      {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => {
                            updateFormData("category", value)
                            updateFormData("subcategory", "")
                          }}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.name} value={category.name}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
                      </div>

                      <div>
                        <Label htmlFor="subcategory">Subcategory</Label>
                        <Select
                          value={formData.subcategory}
                          onValueChange={(value) => updateFormData("subcategory", value)}
                          disabled={!formData.category}
                        >
                          <SelectTrigger id="subcategory">
                            <SelectValue placeholder="Select subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            {getSubcategories().map((subcategory) => (
                              <SelectItem key={subcategory} value={subcategory}>
                                {subcategory}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="harvestDate">Harvest Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            id="harvestDate"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.harvestDate ? (
                              format(formData.harvestDate, "PPP")
                            ) : (
                              <span>Select harvest date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.harvestDate}
                            onSelect={(date) => updateFormData("harvestDate", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Origin Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="origin.country">Country *</Label>
                          <Select
                            value={formData.origin.country}
                            onValueChange={(value) => updateFormData("origin.country", value)}
                          >
                            <SelectTrigger id="origin.country">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ecuador">Ecuador</SelectItem>
                              <SelectItem value="colombia">Colombia</SelectItem>
                              <SelectItem value="peru">Peru</SelectItem>
                              <SelectItem value="brazil">Brazil</SelectItem>
                              <SelectItem value="madagascar">Madagascar</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors["origin.country"] && (
                            <p className="text-sm text-red-600 mt-1">{errors["origin.country"]}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="origin.region">Region/Province</Label>
                          <Input
                            id="origin.region"
                            value={formData.origin.region}
                            onChange={(e) => updateFormData("origin.region", e.target.value)}
                            placeholder="e.g., Guayas"
                          />
                        </div>

                        <div>
                          <Label htmlFor="origin.farm">Farm/Estate Name</Label>
                          <Input
                            id="origin.farm"
                            value={formData.origin.farm}
                            onChange={(e) => updateFormData("origin.farm", e.target.value)}
                            placeholder="e.g., Green Valley Farm"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button type="button" onClick={() => setActiveTab("details")}>
                    Next: Product Details
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>Provide specific details about your product</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="quantity">Quantity *</Label>
                        <Input
                          id="quantity"
                          type="number"
                          value={formData.quantity}
                          onChange={(e) => updateFormData("quantity", e.target.value)}
                          placeholder="e.g., 500"
                        />
                        {errors.quantity && <p className="text-sm text-red-600 mt-1">{errors.quantity}</p>}
                      </div>

                      <div>
                        <Label htmlFor="unit">Unit *</Label>
                        <Select value={formData.unit} onValueChange={(value) => updateFormData("unit", value)}>
                          <SelectTrigger id="unit">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">Kilograms (kg)</SelectItem>
                            <SelectItem value="lb">Pounds (lb)</SelectItem>
                            <SelectItem value="g">Grams (g)</SelectItem>
                            <SelectItem value="ton">Metric Tons</SelectItem>
                            <SelectItem value="bag">Bags</SelectItem>
                            <SelectItem value="box">Boxes</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.unit && <p className="text-sm text-red-600 mt-1">{errors.unit}</p>}
                      </div>

                      <div>
                        <Label htmlFor="grade">Grade/Quality</Label>
                        <Input
                          id="grade"
                          value={formData.grade}
                          onChange={(e) => updateFormData("grade", e.target.value)}
                          placeholder="e.g., Premium, Grade A, etc."
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="processingMethod">Processing Method</Label>
                      <Input
                        id="processingMethod"
                        value={formData.processingMethod}
                        onChange={(e) => updateFormData("processingMethod", e.target.value)}
                        placeholder="e.g., Sun-dried, Wet Process, etc."
                      />
                    </div>

                    <MultiSelect
                      label="Certifications"
                      options={certificationOptions}
                      selected={formData.certifications}
                      onChange={(selected) => updateFormData("certifications", selected)}
                      helpText="Select all certifications that apply to this product"
                    />

                    <MultiSelect
                      label="Product Attributes"
                      options={attributeOptions}
                      selected={formData.attributes}
                      onChange={(selected) => updateFormData("attributes", selected)}
                      helpText="Select attributes that highlight special qualities of your product"
                    />

                    <div>
                      <Label htmlFor="qualityDescription">Quality Description</Label>
                      <Textarea
                        id="qualityDescription"
                        value={formData.qualityDescription}
                        onChange={(e) => updateFormData("qualityDescription", e.target.value)}
                        placeholder="Describe the quality characteristics, flavor profile, aroma, etc."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                    Back: Basic Info
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("auction")}>
                    Next: Auction Settings
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="auction" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dutch Auction Settings</CardTitle>
                    <CardDescription>Configure how your Dutch auction will work</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                      <div className="flex items-start">
                        <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <h4 className="font-medium">How Dutch Auctions Work</h4>
                          <p className="mt-1">
                            In a Dutch auction, the price starts high and gradually decreases until a buyer makes a
                            purchase. You'll set:
                          </p>
                          <ul className="mt-2 space-y-1">
                            <li>• Market Price: The current market value of your product</li>
                            <li>• Starting Price: The initial (higher) price when the auction begins</li>
                            <li>• Minimum Price: The lowest price you're willing to accept (50% of market price)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="marketPrice">Market Price (per {formData.unit}) *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 text-sm">
                              The current market value of your product. This helps establish a fair price range.
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="marketPrice"
                            type="number"
                            step="0.01"
                            value={formData.marketPrice}
                            onChange={(e) => updateFormData("marketPrice", e.target.value)}
                            onBlur={calculateMinPrice}
                            placeholder="2.00"
                            className="pl-10"
                          />
                        </div>
                        {errors.marketPrice && <p className="text-sm text-red-600 mt-1">{errors.marketPrice}</p>}
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="startingPrice">Starting Price (per {formData.unit}) *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 text-sm">
                              The initial price when the auction begins. Typically slightly higher than market price.
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="startingPrice"
                            type="number"
                            step="0.01"
                            value={formData.startingPrice}
                            onChange={(e) => updateFormData("startingPrice", e.target.value)}
                            placeholder="2.50"
                            className="pl-10"
                          />
                        </div>
                        {errors.startingPrice && <p className="text-sm text-red-600 mt-1">{errors.startingPrice}</p>}
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="minimumPrice">Minimum Price (per {formData.unit}) *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 text-sm">
                              The lowest price you're willing to accept. Cannot be less than 50% of market price.
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="minimumPrice"
                            type="number"
                            step="0.01"
                            value={formData.minimumPrice}
                            onChange={(e) => updateFormData("minimumPrice", e.target.value)}
                            placeholder="1.00"
                            className="pl-10"
                          />
                        </div>
                        {calculatedMinPrice && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Minimum allowed: ${calculatedMinPrice} (50% of market price)
                          </p>
                        )}
                        {errors.minimumPrice && <p className="text-sm text-red-600 mt-1">{errors.minimumPrice}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auctionDuration">Auction Duration (hours) *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 text-sm">
                              How long the auction will run. The price will gradually decrease from the starting price
                              to the minimum price over this period.
                            </PopoverContent>
                          </Popover>
                        </div>
                        <Select
                          value={formData.auctionDuration}
                          onValueChange={(value) => updateFormData("auctionDuration", value)}
                        >
                          <SelectTrigger id="auctionDuration">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12">12 hours</SelectItem>
                            <SelectItem value="24">24 hours</SelectItem>
                            <SelectItem value="48">48 hours</SelectItem>
                            <SelectItem value="72">72 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="scheduledStart">Scheduled Start (Optional)</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                              id="scheduledStart"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.scheduledStart ? (
                                format(formData.scheduledStart, "PPP")
                              ) : (
                                <span>Schedule start date (optional)</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.scheduledStart}
                              onSelect={(date) => updateFormData("scheduledStart", date)}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                        <p className="text-xs text-muted-foreground mt-1">
                          If not set, the auction will start immediately upon approval
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="autoRenew"
                            checked={formData.autoRenew}
                            onCheckedChange={(checked) => updateFormData("autoRenew", checked)}
                          />
                          <Label htmlFor="autoRenew">Auto-renew if not sold</Label>
                        </div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 text-sm">
                            If enabled, the auction will automatically restart if the product doesn't sell during the
                            auction period.
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="reserveQuantity"
                            checked={formData.reserveQuantity}
                            onCheckedChange={(checked) => updateFormData("reserveQuantity", checked)}
                          />
                          <Label htmlFor="reserveQuantity">Allow partial quantity purchases</Label>
                        </div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 text-sm">
                            If enabled, buyers can purchase a portion of the total quantity rather than the entire lot.
                          </PopoverContent>
                        </Popover>
                      </div>

                      {formData.reserveQuantity && (
                        <div className="pl-8">
                          <Label htmlFor="reserveQuantityAmount">Minimum Order Quantity</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              id="reserveQuantityAmount"
                              type="number"
                              value={formData.reserveQuantityAmount}
                              onChange={(e) => updateFormData("reserveQuantityAmount", e.target.value)}
                              placeholder="50"
                              className="max-w-[150px]"
                            />
                            <span>{formData.unit}</span>
                          </div>
                          {errors.reserveQuantityAmount && (
                            <p className="text-sm text-red-600 mt-1">{errors.reserveQuantityAmount}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                    Back: Product Details
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("images")}>
                    Next: Images & Media
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="images" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Images & Media</CardTitle>
                    <CardDescription>Upload images and documents for your product</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FileUpload
                      label="Product Images *"
                      accept="image/*"
                      multiple={true}
                      files={formData.images}
                      onChange={(files) => updateFormData("images", files)}
                      helpText="Upload high-quality images of your product. First image will be the main image."
                    />
                    {errors.images && <p className="text-sm text-red-600 mt-1">{errors.images}</p>}

                    <FileUpload
                      label="Certification Documents"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple={true}
                      files={formData.certificateFiles}
                      onChange={(files) => updateFormData("certificateFiles", files)}
                      helpText="Upload certification documents to verify your product claims."
                    />

                    <FileUpload
                      label="Quality Reports"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      multiple={true}
                      files={formData.qualityReportFiles}
                      onChange={(files) => updateFormData("qualityReportFiles", files)}
                      helpText="Upload quality analysis reports, lab tests, or other quality documentation."
                    />
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("auction")}>
                    Back: Auction Settings
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("shipping")}>
                    Next: Shipping
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping & Logistics</CardTitle>
                    <CardDescription>Provide shipping and handling information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <MultiSelect
                      label="Shipping Methods"
                      options={shippingMethodOptions}
                      selected={formData.shippingMethods}
                      onChange={(selected) => updateFormData("shippingMethods", selected)}
                      helpText="Select all shipping methods you offer"
                    />

                    <div>
                      <Label htmlFor="shippingCost">Shipping Cost</Label>
                      <Input
                        id="shippingCost"
                        value={formData.shippingCost}
                        onChange={(e) => updateFormData("shippingCost", e.target.value)}
                        placeholder="e.g., $50 flat rate, Free over $500, etc."
                      />
                    </div>

                    <div>
                      <Label htmlFor="estimatedShippingTime">Estimated Shipping Time</Label>
                      <Input
                        id="estimatedShippingTime"
                        value={formData.estimatedShippingTime}
                        onChange={(e) => updateFormData("estimatedShippingTime", e.target.value)}
                        placeholder="e.g., 3-5 business days, 1-2 weeks, etc."
                      />
                    </div>

                    <div>
                      <Label htmlFor="packagingType">Packaging Type</Label>
                      <Select
                        value={formData.packagingType}
                        onValueChange={(value) => updateFormData("packagingType", value)}
                      >
                        <SelectTrigger id="packagingType">
                          <SelectValue placeholder="Select packaging type" />
                        </SelectTrigger>
                        <SelectContent>
                          {packagingOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <MultiSelect
                      label="Shipping Restrictions"
                      options={shippingRestrictionOptions}
                      selected={formData.shippingRestrictions}
                      onChange={(selected) => updateFormData("shippingRestrictions", selected)}
                      helpText="Select any shipping restrictions that apply"
                    />

                    <div>
                      <Label htmlFor="shippingNotes">Additional Shipping Notes</Label>
                      <Textarea
                        id="shippingNotes"
                        value={formData.shippingNotes}
                        onChange={(e) => updateFormData("shippingNotes", e.target.value)}
                        placeholder="Any additional information about shipping, handling, or logistics..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("images")}>
                    Back: Images & Media
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("terms")}>
                    Next: Terms & Conditions
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="terms" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Terms & Conditions</CardTitle>
                    <CardDescription>Set your terms and review your listing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="refundPolicy">Refund Policy</Label>
                      <Select
                        value={formData.refundPolicy}
                        onValueChange={(value) => updateFormData("refundPolicy", value)}
                      >
                        <SelectTrigger id="refundPolicy">
                          <SelectValue placeholder="Select refund policy" />
                        </SelectTrigger>
                        <SelectContent>
                          {refundPolicyOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="additionalTerms">Additional Terms (Optional)</Label>
                      <Textarea
                        id="additionalTerms"
                        value={formData.additionalTerms}
                        onChange={(e) => updateFormData("additionalTerms", e.target.value)}
                        placeholder="Any additional terms or conditions for this listing..."
                        rows={3}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="termsAccepted"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => updateFormData("termsAccepted", checked)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="termsAccepted" className="text-sm">
                          I confirm that all information provided is accurate and I agree to the{" "}
                          <Link href="/seller-terms" className="text-green-600 hover:underline">
                            Seller Terms and Conditions
                          </Link>
                          *
                        </Label>
                      </div>
                    </div>
                    {errors.termsAccepted && <p className="text-sm text-red-600 mt-1">{errors.termsAccepted}</p>}

                    <div className="bg-yellow-50 p-4 rounded-lg mt-6">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                        <div className="text-sm">
                          <h4 className="font-medium text-yellow-800">Before you submit</h4>
                          <ul className="mt-2 space-y-1 text-yellow-700">
                            <li>• Your listing will be reviewed before going live</li>
                            <li>• Ensure all product information and images are accurate</li>
                            <li>• You can edit your listing until it's approved</li>
                            <li>• Once approved, your auction will start as scheduled</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("shipping")}>
                    Back: Shipping
                  </Button>
                  <div className="space-x-2">
                    <Button type="button" variant="outline" onClick={handleSaveDraft}>
                      <Save className="w-4 h-4 mr-2" />
                      Save as Draft
                    </Button>
                    <Button type="submit">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Create Listing
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        )}
      </main>
    </div>
  )
}

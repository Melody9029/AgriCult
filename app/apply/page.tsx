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
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Leaf,
  Users,
  Building,
  FileText,
  Camera,
  Award,
} from "lucide-react"

interface FormData {
  // Basic Information
  farmName: string
  ownerName: string
  email: string
  phone: string
  website: string

  // Location
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  coordinates: { lat: string; lng: string }

  // Farm Details
  farmSize: string
  farmSizeUnit: string
  established: string
  farmType: string
  primaryProducts: string[]
  secondaryProducts: string[]

  // Business Information
  businessStructure: string
  taxId: string
  businessLicense: string
  yearsInBusiness: string
  annualRevenue: string

  // Certifications
  certifications: Array<{
    name: string
    authority: string
    year: string
    expiryDate: string
    certificateNumber: string
  }>

  // Farming Practices
  farmingMethods: string[]
  sustainabilityPractices: string[]
  qualityControl: string

  // Production & Capacity
  monthlyCapacity: string
  seasonalVariations: string
  harvestSeasons: string[]
  storageCapacity: string
  processingCapabilities: string[]

  // Logistics
  shippingMethods: string[]
  packagingTypes: string[]
  minimumOrderQuantity: string
  leadTime: string

  // Financial
  bankName: string
  accountHolder: string
  paymentMethods: string[]

  // Documents & Media
  documents: File[]
  farmPhotos: File[]
  productPhotos: File[]

  // Additional Information
  description: string
  whyJoin: string
  marketingHelp: boolean
  additionalServices: string[]

  // Terms & Agreements
  termsAccepted: boolean
  dataProcessingConsent: boolean
  marketingConsent: boolean
}

const initialFormData: FormData = {
  farmName: "",
  ownerName: "",
  email: "",
  phone: "",
  website: "",
  address: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  coordinates: { lat: "", lng: "" },
  farmSize: "",
  farmSizeUnit: "hectares",
  established: "",
  farmType: "",
  primaryProducts: [],
  secondaryProducts: [],
  businessStructure: "",
  taxId: "",
  businessLicense: "",
  yearsInBusiness: "",
  annualRevenue: "",
  certifications: [],
  farmingMethods: [],
  sustainabilityPractices: [],
  qualityControl: "",
  monthlyCapacity: "",
  seasonalVariations: "",
  harvestSeasons: [],
  storageCapacity: "",
  processingCapabilities: [],
  shippingMethods: [],
  packagingTypes: [],
  minimumOrderQuantity: "",
  leadTime: "",
  bankName: "",
  accountHolder: "",
  paymentMethods: [],
  documents: [],
  farmPhotos: [],
  productPhotos: [],
  description: "",
  whyJoin: "",
  marketingHelp: false,
  additionalServices: [],
  termsAccepted: false,
  dataProcessingConsent: false,
  marketingConsent: false,
}

const steps = [
  { id: 1, title: "Basic Information", icon: Building },
  { id: 2, title: "Farm Details", icon: Leaf },
  { id: 3, title: "Business & Legal", icon: FileText },
  { id: 4, title: "Certifications", icon: Award },
  { id: 5, title: "Production", icon: Users },
  { id: 6, title: "Media & Documents", icon: Camera },
  { id: 7, title: "Review & Submit", icon: CheckCircle },
]

const productOptions = [
  "Cocoa/Cacao",
  "Coffee",
  "Quinoa",
  "Vanilla",
  "Spices",
  "Tropical Fruits",
  "Nuts",
  "Seeds",
  "Grains",
  "Vegetables",
  "Herbs",
  "Tea",
  "Honey",
  "Olive Oil",
  "Coconut Products",
  "Superfoods",
  "Other",
]

const certificationOptions = [
  "USDA Organic",
  "EU Organic",
  "Fair Trade International",
  "Fair Trade USA",
  "Rainforest Alliance",
  "UTZ Certified",
  "Bird Friendly",
  "Demeter Biodynamic",
  "JAS Organic",
  "IFOAM",
  "Carbon Neutral",
  "B Corp",
  "Other",
]

const farmingMethodOptions = [
  "Organic",
  "Biodynamic",
  "Permaculture",
  "Regenerative Agriculture",
  "Agroforestry",
  "Integrated Pest Management",
  "No-Till Farming",
  "Crop Rotation",
  "Companion Planting",
  "Natural Fertilizers",
]

const sustainabilityOptions = [
  "Water Conservation",
  "Solar Energy",
  "Wind Energy",
  "Composting",
  "Biodiversity Protection",
  "Soil Conservation",
  "Carbon Sequestration",
  "Waste Reduction",
  "Renewable Energy",
  "Wildlife Corridors",
]

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id

          return (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isCompleted
                    ? "bg-green-600 border-green-600 text-white"
                    : isCurrent
                      ? "border-green-600 text-green-600"
                      : "border-gray-300 text-gray-400"
                }`}
              >
                {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 ${isCompleted ? "bg-green-600" : "bg-gray-300"}`} />
              )}
            </div>
          )
        })}
      </div>
      <div className="mt-4">
        <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
        </p>
      </div>
    </div>
  )
}

function FileUpload({
  label,
  accept,
  multiple = false,
  files,
  onChange,
}: {
  label: string
  accept: string
  multiple?: boolean
  files: File[]
  onChange: (files: File[]) => void
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
      <Label className="text-sm font-medium">{label}</Label>
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
  placeholder,
}: {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder: string
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
    <div className="relative">
      <Button type="button" variant="outline" className="w-full justify-between" onClick={() => setIsOpen(!isOpen)}>
        {selected.length > 0 ? `${selected.length} selected` : placeholder}
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
  )
}

export default function ProducerApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { name: "", authority: "", year: "", expiryDate: "", certificateNumber: "" },
      ],
    }))
  }

  const updateCertification = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => (i === index ? { ...cert, [field]: value } : cert)),
    }))
  }

  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }))
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.farmName) newErrors.farmName = "Farm name is required"
        if (!formData.ownerName) newErrors.ownerName = "Owner name is required"
        if (!formData.email) newErrors.email = "Email is required"
        if (!formData.phone) newErrors.phone = "Phone number is required"
        if (!formData.country) newErrors.country = "Country is required"
        break
      case 2:
        if (!formData.farmSize) newErrors.farmSize = "Farm size is required"
        if (!formData.established) newErrors.established = "Establishment year is required"
        if (!formData.farmType) newErrors.farmType = "Farm type is required"
        if (formData.primaryProducts.length === 0)
          newErrors.primaryProducts = "At least one primary product is required"
        break
      case 3:
        if (!formData.businessStructure) newErrors.businessStructure = "Business structure is required"
        if (!formData.yearsInBusiness) newErrors.yearsInBusiness = "Years in business is required"
        break
      case 7:
        if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions"
        if (!formData.dataProcessingConsent) newErrors.dataProcessingConsent = "Data processing consent is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Handle form submission
      console.log("Form submitted:", formData)
      // Here you would typically send the data to your backend
      alert(
        "Application submitted successfully! We'll review your application and get back to you within 5-7 business days.",
      )
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farmName">Farm/Business Name *</Label>
                    <Input
                      id="farmName"
                      value={formData.farmName}
                      onChange={(e) => updateFormData("farmName", e.target.value)}
                      placeholder="Green Valley Farm"
                    />
                    {errors.farmName && <p className="text-sm text-red-600">{errors.farmName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="ownerName">Owner/Contact Name *</Label>
                    <Input
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => updateFormData("ownerName", e.target.value)}
                      placeholder="John Rodriguez"
                    />
                    {errors.ownerName && <p className="text-sm text-red-600">{errors.ownerName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="info@greenvalleyfarm.com"
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => updateFormData("website", e.target.value)}
                    placeholder="www.greenvalleyfarm.com"
                  />
                </div>

                <Separator />

                <div>
                  <Label htmlFor="address">Farm Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    placeholder="123 Farm Road"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      placeholder="Guayaquil"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => updateFormData("state", e.target.value)}
                      placeholder="Guayas"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select value={formData.country} onValueChange={(value) => updateFormData("country", value)}>
                      <SelectTrigger>
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
                    {errors.country && <p className="text-sm text-red-600">{errors.country}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Leaf className="w-5 h-5 mr-2" />
                  Farm Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="farmSize">Farm Size *</Label>
                    <Input
                      id="farmSize"
                      type="number"
                      value={formData.farmSize}
                      onChange={(e) => updateFormData("farmSize", e.target.value)}
                      placeholder="150"
                    />
                    {errors.farmSize && <p className="text-sm text-red-600">{errors.farmSize}</p>}
                  </div>
                  <div>
                    <Label htmlFor="farmSizeUnit">Unit</Label>
                    <Select
                      value={formData.farmSizeUnit}
                      onValueChange={(value) => updateFormData("farmSizeUnit", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hectares">Hectares</SelectItem>
                        <SelectItem value="acres">Acres</SelectItem>
                        <SelectItem value="square_meters">Square Meters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="established">Year Established *</Label>
                    <Input
                      id="established"
                      type="number"
                      value={formData.established}
                      onChange={(e) => updateFormData("established", e.target.value)}
                      placeholder="1995"
                    />
                    {errors.established && <p className="text-sm text-red-600">{errors.established}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="farmType">Farm Type *</Label>
                  <Select value={formData.farmType} onValueChange={(value) => updateFormData("farmType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select farm type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family_owned">Family Owned</SelectItem>
                      <SelectItem value="cooperative">Cooperative</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="smallholder">Smallholder</SelectItem>
                      <SelectItem value="estate">Estate</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.farmType && <p className="text-sm text-red-600">{errors.farmType}</p>}
                </div>

                <div>
                  <Label>Primary Products *</Label>
                  <MultiSelect
                    options={productOptions}
                    selected={formData.primaryProducts}
                    onChange={(selected) => updateFormData("primaryProducts", selected)}
                    placeholder="Select primary products"
                  />
                  {errors.primaryProducts && <p className="text-sm text-red-600">{errors.primaryProducts}</p>}
                </div>

                <div>
                  <Label>Secondary Products (Optional)</Label>
                  <MultiSelect
                    options={productOptions}
                    selected={formData.secondaryProducts}
                    onChange={(selected) => updateFormData("secondaryProducts", selected)}
                    placeholder="Select secondary products"
                  />
                </div>

                <div>
                  <Label>Farming Methods</Label>
                  <MultiSelect
                    options={farmingMethodOptions}
                    selected={formData.farmingMethods}
                    onChange={(selected) => updateFormData("farmingMethods", selected)}
                    placeholder="Select farming methods"
                  />
                </div>

                <div>
                  <Label>Sustainability Practices</Label>
                  <MultiSelect
                    options={sustainabilityOptions}
                    selected={formData.sustainabilityPractices}
                    onChange={(selected) => updateFormData("sustainabilityPractices", selected)}
                    placeholder="Select sustainability practices"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Business & Legal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessStructure">Business Structure *</Label>
                    <Select
                      value={formData.businessStructure}
                      onValueChange={(value) => updateFormData("businessStructure", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business structure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="cooperative">Cooperative</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.businessStructure && <p className="text-sm text-red-600">{errors.businessStructure}</p>}
                  </div>
                  <div>
                    <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                    <Input
                      id="yearsInBusiness"
                      type="number"
                      value={formData.yearsInBusiness}
                      onChange={(e) => updateFormData("yearsInBusiness", e.target.value)}
                      placeholder="25"
                    />
                    {errors.yearsInBusiness && <p className="text-sm text-red-600">{errors.yearsInBusiness}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="taxId">Tax ID/Registration Number</Label>
                    <Input
                      id="taxId"
                      value={formData.taxId}
                      onChange={(e) => updateFormData("taxId", e.target.value)}
                      placeholder="123-45-6789"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessLicense">Business License Number</Label>
                    <Input
                      id="businessLicense"
                      value={formData.businessLicense}
                      onChange={(e) => updateFormData("businessLicense", e.target.value)}
                      placeholder="BL-123456"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="annualRevenue">Annual Revenue Range</Label>
                  <Select
                    value={formData.annualRevenue}
                    onValueChange={(value) => updateFormData("annualRevenue", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select revenue range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under_50k">Under $50,000</SelectItem>
                      <SelectItem value="50k_100k">$50,000 - $100,000</SelectItem>
                      <SelectItem value="100k_500k">$100,000 - $500,000</SelectItem>
                      <SelectItem value="500k_1m">$500,000 - $1,000,000</SelectItem>
                      <SelectItem value="over_1m">Over $1,000,000</SelectItem>
                      <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) => updateFormData("bankName", e.target.value)}
                      placeholder="First National Bank"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountHolder">Account Holder Name</Label>
                    <Input
                      id="accountHolder"
                      value={formData.accountHolder}
                      onChange={(e) => updateFormData("accountHolder", e.target.value)}
                      placeholder="Green Valley Farm LLC"
                    />
                  </div>
                </div>

                <div>
                  <Label>Preferred Payment Methods</Label>
                  <MultiSelect
                    options={["Bank Transfer", "PayPal", "Stripe", "Check", "Wire Transfer", "Cryptocurrency"]}
                    selected={formData.paymentMethods}
                    onChange={(selected) => updateFormData("paymentMethods", selected)}
                    placeholder="Select payment methods"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Certifications
                  </div>
                  <Button type="button" onClick={addCertification} size="sm">
                    Add Certification
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.certifications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No certifications added yet.</p>
                    <p className="text-sm">Click "Add Certification" to get started.</p>
                  </div>
                ) : (
                  formData.certifications.map((cert, index) => (
                    <Card key={index} className="border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium">Certification {index + 1}</h4>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeCertification(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Certification Name</Label>
                            <Select
                              value={cert.name}
                              onValueChange={(value) => updateCertification(index, "name", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select certification" />
                              </SelectTrigger>
                              <SelectContent>
                                {certificationOptions.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Certifying Authority</Label>
                            <Input
                              value={cert.authority}
                              onChange={(e) => updateCertification(index, "authority", e.target.value)}
                              placeholder="USDA, Fair Trade International, etc."
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <Label>Year Obtained</Label>
                            <Input
                              type="number"
                              value={cert.year}
                              onChange={(e) => updateCertification(index, "year", e.target.value)}
                              placeholder="2020"
                            />
                          </div>
                          <div>
                            <Label>Expiry Date</Label>
                            <Input
                              type="date"
                              value={cert.expiryDate}
                              onChange={(e) => updateCertification(index, "expiryDate", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Certificate Number</Label>
                            <Input
                              value={cert.certificateNumber}
                              onChange={(e) => updateCertification(index, "certificateNumber", e.target.value)}
                              placeholder="CERT-123456"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Production & Capacity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="monthlyCapacity">Monthly Production Capacity</Label>
                    <Input
                      id="monthlyCapacity"
                      value={formData.monthlyCapacity}
                      onChange={(e) => updateFormData("monthlyCapacity", e.target.value)}
                      placeholder="500 kg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="minimumOrderQuantity">Minimum Order Quantity</Label>
                    <Input
                      id="minimumOrderQuantity"
                      value={formData.minimumOrderQuantity}
                      onChange={(e) => updateFormData("minimumOrderQuantity", e.target.value)}
                      placeholder="50 kg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="storageCapacity">Storage Capacity</Label>
                    <Input
                      id="storageCapacity"
                      value={formData.storageCapacity}
                      onChange={(e) => updateFormData("storageCapacity", e.target.value)}
                      placeholder="2000 kg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="leadTime">Lead Time</Label>
                    <Input
                      id="leadTime"
                      value={formData.leadTime}
                      onChange={(e) => updateFormData("leadTime", e.target.value)}
                      placeholder="7-14 days"
                    />
                  </div>
                </div>

                <div>
                  <Label>Harvest Seasons</Label>
                  <MultiSelect
                    options={["Spring", "Summer", "Fall", "Winter", "Year-round"]}
                    selected={formData.harvestSeasons}
                    onChange={(selected) => updateFormData("harvestSeasons", selected)}
                    placeholder="Select harvest seasons"
                  />
                </div>

                <div>
                  <Label>Processing Capabilities</Label>
                  <MultiSelect
                    options={[
                      "Drying",
                      "Fermentation",
                      "Roasting",
                      "Grinding",
                      "Packaging",
                      "Sorting",
                      "Cleaning",
                      "Storage",
                      "Quality Testing",
                      "Organic Processing",
                    ]}
                    selected={formData.processingCapabilities}
                    onChange={(selected) => updateFormData("processingCapabilities", selected)}
                    placeholder="Select processing capabilities"
                  />
                </div>

                <div>
                  <Label>Shipping Methods</Label>
                  <MultiSelect
                    options={[
                      "Local Pickup",
                      "Standard Shipping",
                      "Express Delivery",
                      "Refrigerated Transport",
                      "Container Shipping",
                      "Air Freight",
                    ]}
                    selected={formData.shippingMethods}
                    onChange={(selected) => updateFormData("shippingMethods", selected)}
                    placeholder="Select shipping methods"
                  />
                </div>

                <div>
                  <Label>Packaging Types</Label>
                  <MultiSelect
                    options={[
                      "Jute Bags",
                      "Paper Bags",
                      "Plastic Bags",
                      "Vacuum Sealed",
                      "Bulk Containers",
                      "Custom Packaging",
                      "Eco-friendly Packaging",
                    ]}
                    selected={formData.packagingTypes}
                    onChange={(selected) => updateFormData("packagingTypes", selected)}
                    placeholder="Select packaging types"
                  />
                </div>

                <div>
                  <Label htmlFor="seasonalVariations">Seasonal Variations (Optional)</Label>
                  <Textarea
                    id="seasonalVariations"
                    value={formData.seasonalVariations}
                    onChange={(e) => updateFormData("seasonalVariations", e.target.value)}
                    placeholder="Describe any seasonal variations in production, quality, or availability..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="qualityControl">Quality Control Measures</Label>
                  <Textarea
                    id="qualityControl"
                    value={formData.qualityControl}
                    onChange={(e) => updateFormData("qualityControl", e.target.value)}
                    placeholder="Describe your quality control processes, testing procedures, and standards..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Media & Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FileUpload
                  label="Farm Photos"
                  accept="image/*"
                  multiple={true}
                  files={formData.farmPhotos}
                  onChange={(files) => updateFormData("farmPhotos", files)}
                />

                <FileUpload
                  label="Product Photos"
                  accept="image/*"
                  multiple={true}
                  files={formData.productPhotos}
                  onChange={(files) => updateFormData("productPhotos", files)}
                />

                <FileUpload
                  label="Documents (Certificates, Licenses, etc.)"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  multiple={true}
                  files={formData.documents}
                  onChange={(files) => updateFormData("documents", files)}
                />

                <Separator />

                <div>
                  <Label htmlFor="description">Farm Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    placeholder="Tell us about your farm, your story, farming philosophy, and what makes your products special..."
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor="whyJoin">Why do you want to join OrganicAuction?</Label>
                  <Textarea
                    id="whyJoin"
                    value={formData.whyJoin}
                    onChange={(e) => updateFormData("whyJoin", e.target.value)}
                    placeholder="Explain your motivation for joining our platform and how it aligns with your business goals..."
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketingHelp"
                    checked={formData.marketingHelp}
                    onCheckedChange={(checked) => updateFormData("marketingHelp", checked)}
                  />
                  <Label htmlFor="marketingHelp">
                    I would like assistance with marketing and promoting my products
                  </Label>
                </div>

                <div>
                  <Label>Additional Services Needed</Label>
                  <MultiSelect
                    options={[
                      "Photography Services",
                      "Product Description Writing",
                      "Translation Services",
                      "Logistics Support",
                      "Quality Certification Assistance",
                      "Marketing Support",
                      "Training on Platform Usage",
                      "Financial Services",
                    ]}
                    selected={formData.additionalServices}
                    onChange={(selected) => updateFormData("additionalServices", selected)}
                    placeholder="Select additional services you might need"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Review & Submit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Application Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Farm Name:</strong> {formData.farmName}
                    </div>
                    <div>
                      <strong>Owner:</strong> {formData.ownerName}
                    </div>
                    <div>
                      <strong>Location:</strong> {formData.city}, {formData.country}
                    </div>
                    <div>
                      <strong>Farm Size:</strong> {formData.farmSize} {formData.farmSizeUnit}
                    </div>
                    <div>
                      <strong>Primary Products:</strong> {formData.primaryProducts.join(", ")}
                    </div>
                    <div>
                      <strong>Certifications:</strong> {formData.certifications.length} added
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="termsAccepted"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => updateFormData("termsAccepted", checked)}
                    />
                    <Label htmlFor="termsAccepted" className="text-sm">
                      I accept the{" "}
                      <Link href="/terms" className="text-green-600 hover:underline">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/seller-agreement" className="text-green-600 hover:underline">
                        Seller Agreement
                      </Link>
                      *
                    </Label>
                  </div>
                  {errors.termsAccepted && <p className="text-sm text-red-600">{errors.termsAccepted}</p>}

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="dataProcessingConsent"
                      checked={formData.dataProcessingConsent}
                      onCheckedChange={(checked) => updateFormData("dataProcessingConsent", checked)}
                    />
                    <Label htmlFor="dataProcessingConsent" className="text-sm">
                      I consent to the processing of my personal data as described in the{" "}
                      <Link href="/privacy" className="text-green-600 hover:underline">
                        Privacy Policy
                      </Link>
                      *
                    </Label>
                  </div>
                  {errors.dataProcessingConsent && (
                    <p className="text-sm text-red-600">{errors.dataProcessingConsent}</p>
                  )}

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="marketingConsent"
                      checked={formData.marketingConsent}
                      onCheckedChange={(checked) => updateFormData("marketingConsent", checked)}
                    />
                    <Label htmlFor="marketingConsent" className="text-sm">
                      I would like to receive marketing communications and updates about OrganicAuction (optional)
                    </Label>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                    <div className="text-sm">
                      <h4 className="font-medium text-yellow-800">What happens next?</h4>
                      <ul className="mt-2 space-y-1 text-yellow-700">
                        <li>• We'll review your application within 5-7 business days</li>
                        <li>• Our team may contact you for additional information or verification</li>
                        <li>• Once approved, you'll receive onboarding materials and platform access</li>
                        <li>• You can start listing your products immediately after approval</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
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
                <Link href="/">Back to Marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Join OrganicAuction as a Producer</h1>
          <p className="text-muted-foreground">
            Connect with conscious consumers worldwide and sell your organic products through our Dutch auction platform
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Form Content */}
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={nextStep} className="flex items-center">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="flex items-center">
              Submit Application
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}

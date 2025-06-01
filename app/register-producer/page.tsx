"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { IDKitWidget, type ISuccessResult, VerificationLevel } from "@worldcoin/idkit"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { usePrivy } from "@privy-io/react-auth" // or your correct Privy import
import Link from "next/link"

export default function ProducerRegistrationPage() {
  const [isWorldcoinVerified, setIsWorldcoinVerified] = useState(false)
  const [worldcoinProof, setWorldcoinProof] = useState<ISuccessResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    farmName: "",
    location: "",
    description: "",
    certifications: "",
    contactPhone: "",
  })


  const router = useRouter()
  const { toast } = useToast()
  const { user, authenticated, login } = usePrivy()

  const WLD_APP_ID = process.env.NEXT_PUBLIC_WLD_APP_ID
  const WLD_ACTION_NAME = process.env.NEXT_PUBLIC_WLD_ACTION_NAME || "producer-registration"

  if (!WLD_APP_ID) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <p className="text-red-500 text-center">Worldcoin App ID is not configured. Please contact support.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleWorldcoinSuccess = (result: ISuccessResult) => {
    console.log("Worldcoin verification successful:", result)
    setWorldcoinProof(result)
    setIsWorldcoinVerified(true)
    toast({
      title: "Human Verification Successful!",
      description: "You can now proceed with producer registration.",
    })
  }

  const handleWorldcoinError = (error: any) => {
    console.error("Worldcoin verification error:", error)
    toast({
      title: "Human Verification Failed",
      description: error.message || "An unknown error occurred during verification.",
      variant: "destructive",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProducerRegistration = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!authenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in first to register as a producer.",
        variant: "destructive",
      })
      return
    }

    if (!isWorldcoinVerified || !worldcoinProof) {
      toast({
        title: "Verification Required",
        description: "Please complete human verification first.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/register-producer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            id: user.id,
            email: user.email?.address || user.linkedAccounts?.find((acc: { type: string; email: string }) => acc.type === "google")?.email,
          },
          worldcoinProof,
          producerData: formData,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Producer Registration Successful!",
          description: "Your producer account has been created and is pending approval.",
        })
        router.push("/producer-dashboard") // Redirect to producer dashboard
      } else {
        toast({
          title: "Registration Failed",
          description: data.message || "An error occurred during registration.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Producer registration error:", error)
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // If user is not authenticated, show sign-in prompt
  if (!authenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Producer Registration</CardTitle>
            <CardDescription>Please sign in first to register as a producer on our platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={login} className="w-full">
              Sign In to Continue
            </Button>
            <div className="text-center text-sm text-gray-600">
              <Link href="/marketplace" className="text-blue-600 hover:underline">
                Back to Marketplace
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Producer Registration</CardTitle>
          <CardDescription>
            Complete human verification and provide your farm details to start selling on our platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Worldcoin Verification */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                  isWorldcoinVerified ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                }`}
              >
                1
              </div>
              <h3 className="text-lg font-semibold">Human Verification</h3>
            </div>

            {!isWorldcoinVerified ? (
              <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                <p className="text-sm text-gray-700">
                  To ensure the integrity of our platform, all producers must complete human verification using World
                  ID.
                </p>
                <IDKitWidget
                  app_id={WLD_APP_ID as `app_${string}`}
                  action={WLD_ACTION_NAME}
                  onSuccess={handleWorldcoinSuccess}
                  onError={handleWorldcoinError}
                  verification_level={VerificationLevel.Orb}
                >
                  {({ open }: { open: () => void }) => (
                    <Button onClick={open} className="w-full">
                      Verify with World ID
                    </Button>
                  )}
                </IDKitWidget>
                <p className="text-xs text-gray-500 text-center">Powered by Worldcoin</p>
              </div>
            ) : (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-700 text-sm">✅ Human verification completed successfully!</p>
              </div>
            )}
          </div>

          {/* Step 2: Producer Information Form */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                  isWorldcoinVerified ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
                }`}
              >
                2
              </div>
              <h3 className="text-lg font-semibold">Farm Information</h3>
            </div>

            {isWorldcoinVerified ? (
              <form onSubmit={handleProducerRegistration} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farmName">Farm/Business Name *</Label>
                    <Input
                      id="farmName"
                      name="farmName"
                      type="text"
                      value={formData.farmName}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      placeholder="Green Valley Organic Farm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      placeholder="City, State/Province, Country"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Farm Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    placeholder="Describe your farm, growing practices, and the types of produce you offer..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="certifications">Certifications</Label>
                  <Input
                    id="certifications"
                    name="certifications"
                    type="text"
                    value={formData.certifications}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="e.g., USDA Organic, Fair Trade, etc."
                  />
                </div>

                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Complete Producer Registration"}
                </Button>
              </form>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm text-center">
                  Complete human verification above to access the registration form.
                </p>
              </div>
            )}
          </div>

          <div className="text-center text-sm text-gray-600">
            <Link href="/marketplace" className="text-blue-600 hover:underline">
              Back to Marketplace
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { IDKitWidget, type ISuccessResult, VerificationLevel } from "@worldcoin/idkit"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast" // Assuming you have a useToast hook

// This is a placeholder for your actual registration logic
async function registerProducerAPI(data: {
  name: string
  email: string
  worldcoinProof: ISuccessResult
}) {
  console.log("Registering producer:", data)
  // Replace with your actual API call to your backend
  // Example:
  // const response = await fetch('/api/register-producer', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // if (!response.ok) {
  //   const errorResult = await response.json();
  //   throw new Error(errorResult.message || "Producer registration failed");
  // }
  // return response.json();

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  if (data.email.includes("fail")) {
    // Simulate a failure condition
    throw new Error("Simulated registration failure for this email.")
  }
  return { success: true, message: "Producer registered successfully (simulated)" }
}

export default function ProducerRegistrationPage() {
  const [isVerified, setIsVerified] = useState(false)
  const [worldcoinProof, setWorldcoinProof] = useState<ISuccessResult | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const WLD_APP_ID = process.env.NEXT_PUBLIC_WLD_APP_ID
  const WLD_ACTION_NAME = process.env.WLD_ACTION_NAME || "producer-registration" // Default if not set

  if (!WLD_APP_ID) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">
          Worldcoin App ID is not configured. Please set NEXT_PUBLIC_WLD_APP_ID environment variable.
        </p>
      </div>
    )
  }

  const handleWorldcoinSuccess = (result: ISuccessResult) => {
    console.log("Worldcoin verification successful:", result)
    setWorldcoinProof(result)
    setIsVerified(true)
    toast({
      title: "Human Verification Successful!",
      description: "You can now proceed with registration.",
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

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!worldcoinProof) {
      toast({
        title: "Verification Required",
        description: "Please complete human verification first.",
        variant: "destructive",
      })
      return
    }
    setIsLoading(true)
    try {
      const result = await registerProducerAPI({ name, email, worldcoinProof })
      toast({
        title: "Registration Submitted!",
        description: result.message || "Your registration has been submitted.",
      })
      // Reset form or redirect
      setName("")
      setEmail("")
      setIsVerified(false)
      setWorldcoinProof(null)
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Could not register producer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Become a Producer</h1>
          <p className="text-xl">Join our platform to sell your organic products through Dutch auctions.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Producer Registration</CardTitle>
            <CardDescription className="text-center">
              Verify you are a human, then complete the registration form.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isVerified ? (
              <div className="flex flex-col items-center space-y-4">
                <p className="text-gray-600 text-sm">
                  To ensure the integrity of our platform, producers are required to complete a human verification step.
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
                <p className="text-xs text-gray-500">Powered by Worldcoin</p>
              </div>
            ) : (
              <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-900">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-900">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="producer@example.com"
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register as Producer"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

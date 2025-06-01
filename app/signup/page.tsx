"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast" // Assuming you have this hook

export default function SignUpPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "The passwords do not match. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulate API call for sign-up
    console.log("Attempting to sign up with:", { fullName, email, password })
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

    // Replace this with your actual sign-up logic (e.g., API call)
    // For demonstration, let's assume a successful registration if email is not "taken@example.com"
    if (email === "taken@example.com") {
      toast({
        title: "Sign Up Failed",
        description: "This email address is already registered.",
        variant: "destructive",
      })
      setIsLoading(false)
    } else if (fullName && email && password) {
      toast({
        title: "Sign Up Successful!",
        description: "Your account has been created. Please sign in.",
      })
      // Redirect to sign-in page or a confirmation page after successful sign-up
      router.push("/signin")
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>Enter your details to register.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignUp}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8} // Basic password strength indicator
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              {"Already have an account? "}
              <Link href="/signin" passHref>
                <span className="font-semibold text-blue-600 hover:underline dark:text-blue-400">Sign In</span>
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

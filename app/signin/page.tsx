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
import { useAuth } from "@/contexts/auth-context"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate API call for sign-in
    console.log("Attempting to sign in with:", { email, password })
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

    // Replace this with your actual sign-in logic (e.g., API call)
    // For demonstration, let's assume a successful login if email is not "fail@example.com"
    if (email === "fail@example.com") {
      toast({
        title: "Sign In Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    } else if (email && password) {
      // Simulate API response
      const response = {
        ok: true,
        json: async () => ({
          user: {
            id: "temp-id",
            fullName: "Logged In User",
            email: email,
          },
          token: "some_jwt_token",
        }),
      }

      if (response.ok) {
        // Assuming 'data' from response.json() contains user info
        // e.g., data = { user: { id: '123', fullName: 'John Doe', email: email }, token: 'some_jwt_token' }
        const data = await response.json()
        const userData = data.user || {
          id: "temp-id",
          fullName: "Logged In User",
          email: email,
          avatarUrl: `https://avatar.vercel.sh/${email}.png`,
        } // Fallback if API doesn't return full user
        console.log("SignInPage: Calling context login with userData:", userData, "token:", data.token)
        login(userData, data.token) // Pass token if available

        toast({
          title: "Sign In Successful!",
          description: "Welcome back!",
        })
        router.push("/")
      } else {
        toast({
          title: "Sign In Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    } else {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignIn}>
          <CardContent className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" passHref>
                  <span className="text-sm text-blue-600 hover:underline dark:text-blue-400">Forgot password?</span>
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              {"Don't have an account? "}
              <Link href="/signup" passHref>
                <span className="font-semibold text-blue-600 hover:underline dark:text-blue-400">Sign Up</span>
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

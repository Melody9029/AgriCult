// app/profile/page.tsx
"use client"

interface LinkedAccount {
  type: string
  email?: string
  displayName?: string
  picture?: string
}

import { useUser } from "@privy-io/react-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-pulse rounded-md bg-gray-200" />
      </div>
    )
  }
  
  if (!user) {
    router.push("/marketplace")
    return null
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>View and manage your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
              {user.email?.address && (
                <img 
                  src={`https://avatar.vercel.sh/${user.email.address}.png`} 
                  alt="Profile" 
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div>
              <h3 className="font-medium">
                {user.email?.address ? user.email.address.split("@")[0] : "User"}
              </h3>
              <p className="text-sm text-gray-500">{user.email?.address || "No email"}</p>
            </div>
          </div>
          
          <div className="pt-4">
            <h4 className="text-sm font-medium mb-2">Connected Accounts</h4>
            <div className="space-y-2">
              {user.linkedAccounts?.map((account: LinkedAccount) => (
                <div key={account.type} className="flex items-center justify-between">
                  <span className="text-sm">{account.type.charAt(0).toUpperCase() + account.type.slice(1)}</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Connected</span>
                </div>
              ))}
            </div>
          </div>
          
          <Button variant="outline" className="w-full mt-4" onClick={() => router.push("/marketplace")}>
            Back to Marketplace
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
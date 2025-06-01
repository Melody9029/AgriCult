// components/user-avatar-dropdown.tsx
"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, UserCircle } from 'lucide-react'
import { usePrivy } from "@privy-io/react-auth"

export function UserAvatarDropdown() {
  const { user, logout } = usePrivy()

  if (!user) {
    return null
  }

  const getInitials = (name: string) => {
    if (!name) return "U"
    return name.charAt(0).toUpperCase()
  }

  const getUserDisplayName = () => {
    // Try to get name from linked accounts
    for (const account of user.linkedAccounts || []) {
      if (account.type === "google" && account.displayName) {
        return account.displayName
      }
      if (account.type === "twitter" && account.displayName) {
        return account.displayName
      }
    }
    
    // Fall back to email if available
    if (user.email?.address) {
      return user.email.address.split("@")[0]
    }
    
    return "User"
  }

  const getUserEmail = () => {
    if (user.email?.address) {
      return user.email.address
    }
    
    // Check linked accounts for email
    for (const account of user.linkedAccounts || []) {
      if (account.type === "google" && account.email) {
        return account.email
      }
    }
    
    return "No email"
  }

  const getAvatarUrl = () => {
    // Check for linked accounts first
    for (const account of user.linkedAccounts || []) {
      if (account.type === "google" && account.picture) {
        return account.picture
      }
      if (account.type === "twitter" && account.picture) {
        return account.picture
      }
    }
    
    // Generate avatar from email
    return `https://avatar.vercel.sh/${getUserEmail()}.png`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={getAvatarUrl() || "/placeholder.svg"} alt={getUserDisplayName()} />
            <AvatarFallback>{getInitials(getUserDisplayName())}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{getUserDisplayName()}</p>
            <p className="text-xs leading-none text-muted-foreground">{getUserEmail()}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center">
            <UserCircle className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()} className="cursor-pointer flex items-center">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
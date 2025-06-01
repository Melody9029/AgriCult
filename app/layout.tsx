// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PrivyClientProvider } from "@privy-io/react-auth"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AgriCult",
  description: "Dutch Auction Platform for Agriculture",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PrivyClientProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
          config={{
            // Login methods to offer users
            loginMethods: ["email", "wallet", "google", "twitter"],
            // Appearance customization
            appearance: {
              theme: "light",
              accentColor: "#16a34a", // Green color to match your app
              logo: "/logo.png", // Optional: your app logo
            },
            // Embedded wallet configuration
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
          }}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystemTransition disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </PrivyClientProvider>
      </body>
    </html>
  )
}
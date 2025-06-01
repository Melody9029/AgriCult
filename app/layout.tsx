import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown"

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
      <body className={`${inter.className} min-h-screen bg-white`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
            <div className="flex flex-col min-h-screen">
              <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                      <Link href="/" className="text-2xl font-bold text-green-600">
                        AgriCult
                      </Link>
                      <nav className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-600 hover:text-green-600">
                          Marketplace
                        </Link>
                        <Link href="/producer" className="text-gray-600 hover:text-green-600">
                          For Producers
                        </Link>
                        <Link href="/about" className="text-gray-600 hover:text-green-600">
                          About
                        </Link>
                      </nav>
                    </div>
                    <div className="flex items-center">
                      <UserAvatarDropdown />
                    </div>
                  </div>
                </div>
              </header>
              <main className="flex-grow">
                {children}
              </main>
              <footer className="bg-[#1C2632] text-white py-8">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-4 gap-8">
                    <div>
                      <h3 className="font-bold mb-4">OrganicAuction</h3>
                      <p className="text-gray-400 text-sm">
                        Connecting organic producers with conscious consumers through fair Dutch auctions.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">For Buyers</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="#" className="text-gray-400 hover:text-white">
                            How It Works
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-gray-400 hover:text-white">
                            Quality Guarantee
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-gray-400 hover:text-white">
                            Shipping Info
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">For Producers</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="#" className="text-gray-400 hover:text-white">
                            Start Selling
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-gray-400 hover:text-white">
                            Pricing Guide
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-gray-400 hover:text-white">
                            Success Stories
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Support</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="#" className="text-gray-400 hover:text-white">
                            Contact Us
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-gray-400 hover:text-white">
                            FAQ
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-gray-400 hover:text-white">
                            Terms of Service
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

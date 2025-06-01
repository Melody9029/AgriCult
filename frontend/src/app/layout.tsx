import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/providers/wagmi";
import { PrivyProviderWrapper } from "@/providers/privy";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgriCult - Dutch Auction Platform",
  description: "A decentralized Dutch auction platform for agricultural products",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <PrivyProviderWrapper>
              {children}
            </PrivyProviderWrapper>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}

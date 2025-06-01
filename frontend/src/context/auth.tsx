"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { usePrivy } from '@privy-io/react-auth';
import { worldcoinConfig, isWorldcoinConfigured } from '@/config/worldcoin';

interface User {
  address?: string;
  isWorldcoinVerified: boolean;
  privyUser: any; // Replace with proper Privy user type
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  verifyWithWorldcoin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user: privyUser, login } = usePrivy();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      if (privyUser) {
        setUser({
          address: privyUser.wallet?.address,
          isWorldcoinVerified: false, // Will be updated after verification
          privyUser,
        })
      } else {
        setUser(null);
      }
      setIsLoading(false)
    }
  , [privyUser]);

  const verifyWithWorldcoin = async () => {
    if (!isWorldcoinConfigured) {
      throw new Error('Worldcoin is not configured');
    }
    
    // Implement Worldcoin verification logic here
    // This will be implemented once we have the deployed URL and Worldcoin credentials
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    verifyWithWorldcoin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 
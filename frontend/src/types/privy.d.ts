declare module '@privy-io/react-auth' {
  export interface User {
    google?: {
      email: string;
      name: string;
      picture: string;
    };
    twitter?: {
      name: string;
      profileImageUrl: string;
    };
    email?: {
      address: string;
    };
    wallet?: {
      address: string;
    };
  }
} 
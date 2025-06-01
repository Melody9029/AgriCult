declare module '@privy-io/react-auth' {
  export interface User {
    id: string;
    google?: {
      email: string;
      name: string | null;
      picture: string | null;
      subject: string;
    };
    twitter?: {
      username: string | null;
      name: string | null;
      profilePictureUrl: string | null;
      subject: string;
    };
    email?: {
      address: string;
    };
    wallet?: {
      address: string;
    };
  }
} 
export interface PrivyUser {
  google?: {
    email: string;
    name: string;
    picture: string; // This is the correct property name for Google
  };
  twitter?: {
    name: string;
    profileImageUrl: string; // This is the correct property name for Twitter
  };
  email?: {
    address: string;
  };
  wallet?: {
    address: string;
  };
} 
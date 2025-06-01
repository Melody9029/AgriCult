import { PrivyProvider } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';

export function PrivyProviderWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        loginMethods: ['email', 'wallet', 'google', 'twitter'],
        appearance: {
          theme: 'light',
          accentColor: '#22C55E',
          logo: '/logo.png',
        },
        defaultChain: 'mainnet',
      }}
      onSuccess={() => router.push('/dashboard')}
    >
      {children}
    </PrivyProvider>
  );
} 
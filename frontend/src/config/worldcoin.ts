export const worldcoinConfig = {
  appId: process.env.NEXT_PUBLIC_WLD_APP_ID || '',
  clientId: process.env.NEXT_PUBLIC_WLD_CLIENT_ID || '',
  actionId: 'agricult-verify',
  signal: 'agricult-user',
} as const;

export const isWorldcoinConfigured = 
  worldcoinConfig.appId !== '' && 
  worldcoinConfig.clientId !== ''; 
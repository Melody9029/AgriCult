import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { createPublicClient } from 'viem'

export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
}) 
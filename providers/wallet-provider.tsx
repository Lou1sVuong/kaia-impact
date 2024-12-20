'use client'

import * as React from 'react'
import { RainbowKitProvider, getDefaultWallets, getDefaultConfig, darkTheme } from '@rainbow-me/rainbowkit'
import { trustWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets'
import { baseSepolia, kairos, base } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, http } from 'wagmi'

const { wallets } = getDefaultWallets()

const config = getDefaultConfig({
  appName: 'athena',
  projectId: '455a9939d641d79b258424737e7f9205',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [trustWallet, ledgerWallet]
    }
  ],
  chains: [kairos],
  transports: {
    [kairos.id]: http('https://rpc.ankr.com/klaytn_testnet')
  },
  ssr: true
})

const queryClient = new QueryClient()

export function WalletProviders({ children }: { children: any }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={kairos}
          showRecentTransactions={true}
          theme={darkTheme({
            accentColor: '#bff009',
            accentColorForeground: 'white',
            borderRadius: 'none'
          })}
          locale='en-US'
        >
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

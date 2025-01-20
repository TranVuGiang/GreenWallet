import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { arbitrum, etherlink, polygon, solana, solanaDevnet, solanaTestnet } from '@reown/appkit/networks'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Get projectId from https://cloud.reown.com
export const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Create a metadata object - optional
export const metadata = {
  name: 'GreenWallet',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}  

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [solana,solanaDevnet,solanaTestnet, polygon, etherlink, arbitrum]
//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
})

// Set up Solana Adapter
export const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
})
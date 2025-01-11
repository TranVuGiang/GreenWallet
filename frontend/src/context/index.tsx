"use client";

import { projectId, wagmiAdapter } from "@/config";
import { createAppKit } from "@reown/appkit";
import { arbitrum, mainnet } from "@reown/appkit/networks";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("ProjectId is not defined");
}

const metadata = {
  name: "GreenWallet",
  description: "GreenWallet-EVM",
  url: "https://greenwallet.com",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arbitrum],
  defaultNetwork: mainnet,
  features: {
    analytics: true,
    email: true,
    socials: ["google", "github", "x", "discord"],
    emailShowWallets: true,
  },
  themeMode: "light",
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

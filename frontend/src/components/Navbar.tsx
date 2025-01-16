import { metadata, projectId, solanaWeb3JsAdapter } from '@/config';
import { etherlink, polygon, solana, solanaDevnet, solanaTestnet } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';



// Create modal
createAppKit({
  projectId,
  metadata,
  themeMode: 'light',
  networks: [solana, solanaTestnet, solanaDevnet , polygon, etherlink],
  adapters: [solanaWeb3JsAdapter],
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | undefined>(undefined)
  const [signedMsg, setSignedMsg] = useState('')
  const [balance, setBalance] = useState('')

  const receiveHash = (hash: string) => {
    setTransactionHash(hash)
  }

  const receiveSignedMsg = (signedMsg: string) => {
    setSignedMsg(signedMsg); // Update the state with the transaction hash
  };

  const receivebalance = (balance: string) => {
    setBalance(balance)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">GreenWallet</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-gray-600 hover:text-green-600">Dashboard</Link>
            <Link to="/swap" className="text-gray-600 hover:text-green-600">Swap</Link>
            <Link to="/impact" className="text-gray-600 hover:text-green-600">Impact</Link>
            <appkit-button/>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link to="/dashboard" className="block py-2 text-gray-600">Dashboard</Link>
            <Link to="/swap" className="block py-2 text-gray-600">Swap</Link>
            <Link to="/impact" className="block py-2 text-gray-600">Impact</Link>
            <appkit-button/>
          </div>
        )}
      </div>
    </nav>
  );
};
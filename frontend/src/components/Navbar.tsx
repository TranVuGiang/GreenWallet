import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Connect Wallet
            </button>
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
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg mt-2">
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
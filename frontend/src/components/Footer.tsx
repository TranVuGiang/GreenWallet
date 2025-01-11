import { Github, Leaf, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6" />
              <span className="text-xl font-bold">GreenWallet</span>
            </div>
            <p className="text-green-200">
              Making crypto sustainable, one transaction at a time.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-green-200 hover:text-white">Dashboard</Link></li>
              <li><Link to="/swap" className="text-green-200 hover:text-white">Swap</Link></li>
              <li><Link to="/impact" className="text-green-200 hover:text-white">Impact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-200 hover:text-white">Documentation</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-green-200 hover:text-white"><Twitter /></a>
              <a href="#" className="text-green-200 hover:text-white"><Github /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-200">
          <p>&copy; 2024 GreenWallet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
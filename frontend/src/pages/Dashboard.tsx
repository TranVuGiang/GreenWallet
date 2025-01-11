// pages/Dashboard.tsx
import { Download, History, Send } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Wallet Dashboard</h1>
      
      {/* Balance Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-600 mb-2">Total Balance</h3>
          <div className="text-2xl font-bold">$12,345.67</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-600 mb-2">SOL Balance</h3>
          <div className="text-2xl font-bold">123.45 SOL</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-600 mb-2">Environmental Impact</h3>
          <div className="text-2xl font-bold">50 Trees</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-600 mb-2">Total Transactions</h3>
          <div className="text-2xl font-bold">1,234</div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <button className="flex items-center justify-center space-x-2 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700">
          <Send className="h-5 w-5" />
          <span>Send</span>
        </button>
        <button className="flex items-center justify-center space-x-2 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700">
          <Download className="h-5 w-5" />
          <span>Receive</span>
        </button>
        <button className="flex items-center justify-center space-x-2 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700">
          <History className="h-5 w-5" />
          <span>History</span>
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Send className="h-5 w-5 text-green-600" />
                </div>
                <div><div className="font-semibold">Sent SOL</div>
                  <div className="text-gray-600 text-sm">To: 0x1234...5678</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-red-600">-1.5 SOL</div>
                <div className="text-gray-600 text-sm">$150.00</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { ArrowDownUp } from 'lucide-react';

export const Swap = () => {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState('SOL');
  const [toToken, setToToken] = useState('USDC');

  const handleSwap = () => {
    // Implement swap logic here
    console.log('Swapping tokens...');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Swap Tokens</h1>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* From Token */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">From</label>
            <div className="flex space-x-4">
              <select 
                className="bg-gray-100 rounded-lg p-3 flex-grow"
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
              >
                <option value="SOL">SOL</option>
                <option value="USDC">USDC</option>
                <option value="ETH">ETH</option>
              </select>
              <input
                type="number"
                className="bg-gray-100 rounded-lg p-3 flex-grow"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
              />
            </div>
          </div>

          {/* Swap Direction Button */}
          <div className="flex justify-center mt-4 mb-0">
            <button 
              className="bg-green-100 p-2 rounded-full hover:bg-green-200"
              onClick={() => {
                setFromToken(toToken);
                setToToken(fromToken);
              }}
            >
              <ArrowDownUp className="text-green-600" />
            </button>
          </div>

          {/* To Token */}
          <div className="mb-6">
            <label className="block text-gray-600 mb-2">To</label>
            <div className="flex space-x-4">
              <select 
                className="bg-gray-100 rounded-lg p-3 flex-grow"
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
              >
                <option value="USDC">USDC</option>
                <option value="SOL">SOL</option>
                <option value="ETH">ETH</option>
              </select>
              <input
                type="number"
                className="bg-gray-100 rounded-lg p-3 flex-grow"
                placeholder="0.0"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                readOnly
              />
            </div>
          </div>

          {/* Swap Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Exchange Rate</span>
              <span>1 SOL = 100 USDC</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Network Fee</span>
              <span>0.001 SOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Environmental Contribution</span>
              <span className="text-green-600">0.1%</span>
            </div>
          </div>

          {/* Swap Button */}
          <button 
            className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700"
            onClick={handleSwap}
          >
            Swap Tokens
          </button>
        </div>
      </div>
    </div>
  );
};
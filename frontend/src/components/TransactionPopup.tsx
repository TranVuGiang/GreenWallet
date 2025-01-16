import type { Provider } from '@reown/appkit-adapter-solana/react';
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { X } from 'lucide-react';
import { useState } from 'react';



export const SendTransactionPopup = ({ isOpen, onClose }) => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { address } = useAppKitAccount();
  const { connection } = useAppKitConnection();
  const { walletProvider } = useAppKitProvider<Provider>('solana');

  const handleSendTx = async () => {
    setError('');
    setIsLoading(true);

    try {
      if (!address || !connection) {
        throw new Error('Người dùng chưa kết nối');
      }

      // Kiểm tra địa chỉ hợp lệ
      try {
        new PublicKey(recipientAddress);
      } catch {
        throw new Error('Địa chỉ người nhận không hợp lệ');
      }

      const wallet = new PublicKey(address);
      const recipient = new PublicKey(recipientAddress);
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL; // Chuyển đổi SOL sang lamports

      if (isNaN(lamports) || lamports <= 0) {
        throw new Error('Số lượng không hợp lệ');
      }

      const latestBlockhash = await connection.getLatestBlockhash();

      const transaction = new Transaction({
        feePayer: wallet,
        recentBlockhash: latestBlockhash?.blockhash,    
      }).add(
        SystemProgram.transfer({
          fromPubkey: wallet,
          toPubkey: recipient,
          lamports: Math.floor(lamports),
        })
      );

      const sig = await walletProvider.sendTransaction(transaction, connection);
      console.log('Transaction sent:', sig);
      
      // Reset form và đóng popup
      setRecipientAddress('');
      setAmount('');
      onClose();
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Gửi SOL</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ người nhận
            </label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="Nhập địa chỉ ví Solana"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số lượng SOL
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ví dụ: 0.1"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleSendTx}
            disabled={isLoading}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Đang xử lý...' : 'Gửi SOL'}
          </button>
        </div>
      </div>
    </div>
  );
};

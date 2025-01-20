// pages/Dashboard.tsx
import { SendTransactionPopup } from "@/components/TransactionPopup";
import { useAppKitAccount } from "@reown/appkit/react";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { Download, History, Send } from "lucide-react";
import { useEffect, useState } from "react";

// Kết nối đến cluster Solana
const connection = new Connection(clusterApiUrl("devnet"));

export const Dashboard = () => {
  const [isSendPopupOpen, setIsSendPopupOpen] = useState(false);
  const { isConnected, address } = useAppKitAccount();
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);

  useEffect(() => {
    if (isConnected && address) {
      (async () => {
        const history = await fetchTransactionHistory(address);
        setTransactionHistory(history || []);
      })();
    }
  }, [isConnected, address]);

  async function fetchTransactionHistory(address: string) {
    try {
      if (!address) throw new Error("Wallet address is undefined");
      const publicKey = new PublicKey(address);
      console.log(publicKey);

      // Fetch the last 10 transaction signatures
      const signatures = await connection.getSignaturesForAddress(publicKey, {
        limit: 10,
      });
      console.log("Signatures:", signatures);

      // Fetch details for each transaction
      const detailedTransactions = await Promise.all(
        signatures.map(async (sig) => {
          const details = await connection.getTransaction(sig.signature, {
            maxSupportedTransactionVersion: 0, // Adjust version if needed
          });
          return details;
        })
      );

      console.log("Detailed Transactions:", detailedTransactions);

      return detailedTransactions;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  }

  // Chuyển giao dịch thành send và receive
  const renderTransactionType = (tx: any, publicKey: PublicKey) => {
    const preBalance = tx?.meta?.preBalances[tx?.transaction?.message?.accountKeys?.findIndex((key: any) => key.equals(publicKey))];
    const postBalance = tx?.meta?.postBalances[tx?.transaction?.message?.accountKeys?.findIndex((key: any) => key.equals(publicKey))];

    if (postBalance > preBalance) {
      return (
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-2 rounded-full">
            <Download className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <div className="font-semibold">Received SOL</div>
            <div className="text-gray-600 text-sm">From: {tx.transaction.message.accountKeys[0]?.toString()}</div>
          </div>
        </div>
      );
    } else if (preBalance > postBalance) {
      return (
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 p-2 rounded-full">
            <Send className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <div className="font-semibold">Sent SOL</div>
            <div className="text-gray-600 text-sm">To: {tx.transaction.message.accountKeys[1]?.toString()}</div>
          </div>
        </div>
      );
    }
    return null;
  };

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
        <button
          onClick={() => setIsSendPopupOpen(true)}
          className="flex items-center justify-center space-x-2 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700"
        >
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
          {transactionHistory.map((tx, i) => (
            <div key={i} className="flex items-center justify-between p-4 border-b">
              {renderTransactionType(tx, new PublicKey(address))}
              <div className="text-right">
                <div className="font-semibold text-green-600">
                  {tx.meta?.postBalances[0] / 10 ** 9} SOL
                </div>
                <div className="text-gray-600 text-sm">$...</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SendTransactionPopup
        isOpen={isSendPopupOpen}
        onClose={() => setIsSendPopupOpen(false)}
      />
    </div>
  );
};

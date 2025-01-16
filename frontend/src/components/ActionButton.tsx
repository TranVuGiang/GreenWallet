import type { Provider } from '@reown/appkit-adapter-solana/react';
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import { SwapController, SwapTokenWithBalance } from "@reown/appkit-core";
import { useAppKit, useAppKitAccount, useAppKitNetwork, useAppKitProvider, useDisconnect } from '@reown/appkit/react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { ArrowDownUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { networks } from '../config';

// Token addresses map with chain specific format
const TOKEN_ADDRESSES = {
    SOL: {
        address: "11111111111111111111111111111111",
        decimals: 9,
        chainId: "eip155",
        networkId: "101"
    },
    USDC: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        chainId: "eip155",
        networkId: "101"
    }
};
interface ActionButtonListProps {
  sendHash: (hash: string ) => void;
  sendSignMsg: (hash: string) => void;
  sendBalance: (balance: string) => void;
}

export const ActionButtonList = ({ sendHash, sendSignMsg, sendBalance }: ActionButtonListProps) => {
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();
    const { switchNetwork } = useAppKitNetwork();
    const { isConnected, address } = useAppKitAccount();
    const { connection } = useAppKitConnection();
    const { walletProvider } = useAppKitProvider<Provider>('solana');

    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [fromToken, setFromToken] = useState('SOL');
    const [toToken, setToToken] = useState('USDC');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const createCaipAddress = (chainId: string, networkId: string, address: string): `${string}:${string}:${string}` => {
        return `${chainId}:${networkId}:${address}`;
    };

    useEffect(() => {
        const fetch = async () => {
            const resp = await SwapController.getTokenList()
            console.log(resp)
        }
        fetch()
    }, [])

    const updateTokenStates = async () => {
        try {
            const fromTokenInfo = TOKEN_ADDRESSES[fromToken];
            const toTokenInfo = TOKEN_ADDRESSES[toToken];

            const sourceTokenInfo: SwapTokenWithBalance = {
                address: createCaipAddress(fromTokenInfo.chainId, fromTokenInfo.networkId, fromTokenInfo.address),
                symbol: fromToken,
                balance: '0',
                decimals: fromTokenInfo.decimals,
                name: fromToken,
                logoURI: '',
                priceUSD: 0
            };

            const targetTokenInfo: SwapTokenWithBalance = {
                address: createCaipAddress(toTokenInfo.chainId, toTokenInfo.networkId, toTokenInfo.address),
                symbol: toToken,
                balance: '0',
                decimals: toTokenInfo.decimals,
                name: toToken,
                logoURI: '',
                priceUSD: 0
            };

            // Set tokens in SwapController
            SwapController.setSourceToken(sourceTokenInfo);
            SwapController.setToToken(targetTokenInfo);

            if (address) {
                // Set the amount after tokens are initialized
                const decimals = fromTokenInfo.decimals;
                const amountInSmallestUnit = (parseFloat(fromAmount) * Math.pow(10, decimals)).toString();
                await SwapController.setSourceTokenAmount(amountInSmallestUnit);
            }

        } catch (err) {
            console.error('Failed to update token states:', err);
            setError('Failed to update token information');
            throw err;
        }
    };

    const handleSwap = async () => {
        try {
            setIsLoading(true);
            setError('');

            if (!address) {
                throw new Error('Please connect your wallet');
            }

            // Initialize the swap state
            await SwapController.initializeState();
            
            // Update token states
            await updateTokenStates(); 

            // Create and send the swap transaction
            const transaction = await SwapController.createSwapTransaction();

            console.log(transaction)
            
            if (transaction) {
                const txHash = await SwapController.sendTransactionForSwap(transaction);
                console.log(txHash);
                
                if (txHash) {
                    sendHash(txHash);
                    setFromAmount('');
                    setToAmount('');
                } else {
                    throw new Error('Swap transaction failed');
                }
            } 
        } catch (err: any) {
            console.error('Swap error:', err);
            setError(err.message || 'Swap failed');
        } finally {
            setIsLoading(false);
        }
    };


    // Hàm kiểm tra địa chỉ Solana hợp lệ
    const isValidSolanaAddress = (address: string) => {
        try {
            new PublicKey(address);
            return true;
        } catch {
            return false;
        }
    };

    const handleSendTx = async () => {
        setError('');
        setIsLoading(true);

        try {
            if (!address || !connection) {
                throw new Error('Người dùng chưa kết nối');
            }

            if (!isValidSolanaAddress(recipientAddress)) {
                throw new Error('Địa chỉ người nhận không hợp lệ');
            }

            const wallet = new PublicKey(address);
            const recipient = new PublicKey(recipientAddress);
            const lamports = parseInt(amount);

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
                    lamports,
                })
            );

            const sig = await walletProvider.sendTransaction(transaction, connection);
            sendHash(sig);
            
            // Reset form sau khi gửi thành công
            setRecipientAddress('');
            setAmount('1000');
            
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignMsg = async () => {
      if (!walletProvider || !address) throw Error('user is disconnected')
      
      const encodedMessage = new TextEncoder().encode("Hello Green Wallety!");
      const sig = await walletProvider.signMessage(encodedMessage);

      const signatureHex = Buffer.from(sig).toString("hex");
      sendSignMsg(signatureHex);
    }

    const handleGetBalance = async () => {
      if (!address || !connection) throw Error('user is disconnected');
      
      const wallet = new PublicKey(address);
      const balance = await connection?.getBalance(wallet);
      if (balance !== undefined) {
        sendBalance(`${balance / LAMPORTS_PER_SOL} SOL`);
      } else {
        sendBalance('- SOL');
      }
    }

    const handleDisconnect = async () => {
      try {
        await disconnect();
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    };

    return (
        <>
        {isConnected ? (
            <div className="w-full max-w-2xl mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                    <button 
                        onClick={() => open()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Open
                    </button>
                    
                    <button 
                        onClick={handleDisconnect}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Disconnect
                    </button>
                    
                    <button 
                        onClick={() => switchNetwork(networks[1])}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Switch Network
                    </button>
                </div>

                {/* Swap Form */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Swap Tokens</h3>
                    
                    <div className="space-y-4">
                        {/* From Token */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                From
                            </label>
                            <div className="flex space-x-4">
                                <select 
                                    className="bg-gray-100 rounded-lg p-3 flex-grow dark:bg-gray-700 dark:text-white"
                                    value={fromToken}
                                    onChange={(e) => setFromToken(e.target.value)}
                                    disabled={isLoading}
                                >
                                    <option value="SOL">SOL</option>
                                    <option value="USDC">USDC</option>
                                </select>
                                <input
                                    type="number"
                                    className="bg-gray-100 rounded-lg p-3 flex-grow dark:bg-gray-700 dark:text-white"
                                    placeholder="0.0"
                                    value={fromAmount}
                                    onChange={(e) => setFromAmount(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Swap Direction Button */}
                        <div className="flex justify-center">
                            <button 
                                className="bg-green-100 p-2 rounded-full hover:bg-green-200 disabled:opacity-50"
                                onClick={() => {
                                    setFromToken(toToken);
                                    setToToken(fromToken);
                                }}
                                disabled={isLoading}
                            >
                                <ArrowDownUp className="text-green-600" />
                            </button>
                        </div>

                        {/* To Token */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                To
                            </label>
                            <div className="flex space-x-4">
                                <select 
                                    className="bg-gray-100 rounded-lg p-3 flex-grow dark:bg-gray-700 dark:text-white"
                                    value={toToken}
                                    onChange={(e) => setToToken(e.target.value)}
                                    disabled={isLoading}
                                >
                                    <option value="USDC">USDC</option>
                                    <option value="SOL">SOL</option>
                                </select>
                                <input
                                    type="number"
                                    className="bg-gray-100 rounded-lg p-3 flex-grow dark:bg-gray-700 dark:text-white"
                                    placeholder="0.0"
                                    value={toAmount}
                                    readOnly
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleSwap}
                            disabled={isLoading || !fromAmount}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : 'Swap'}
                        </button>
                    </div>
                </div>

                {/* Transfer Form */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Send Transaction</h3>
                    {/* ... existing transfer form ... */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button 
                        onClick={handleSignMsg}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Sign Message
                    </button>
                    
                    <button 
                        onClick={handleGetBalance}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Get Balance
                    </button>
                </div>
            </div>
        ) : null}
        </>
    );
}
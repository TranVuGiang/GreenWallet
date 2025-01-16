import {
    useAppKitAccount,
    useAppKitConnection,
    useAppKitProvider,
} from "@reown/appkit/react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
  
  interface SwapProps {
    sendSwapResult: (result: string) => void;
  }
  
  export const SwapToken = ({ sendSwapResult }: SwapProps) => {
    const { address } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider("solana");
    const { connection } = useAppKitConnection();
  
    const handleSwap = async () => {
      if (!address || !walletProvider || !connection) {
        sendSwapResult("User is disconnected or provider is unavailable.");
        return;
      }
  
      try {
        const sourceToken = new PublicKey("<SOURCE_TOKEN_ADDRESS>");
        const destinationToken = new PublicKey("<DESTINATION_TOKEN_ADDRESS>");
        const amount = 1 * 10 ** 6;
  
        // Fetch the latest blockhash
        const latestBlockhash = await connection.getLatestBlockhash();
  
        // Create transaction
        const transaction = new Transaction({
          feePayer: new PublicKey(address),
          recentBlockhash: latestBlockhash.blockhash,
        });
  
        // Add swap instruction
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: new PublicKey(address),
            toPubkey: destinationToken,
            lamports: amount,
          })
        );
  
        // Send transaction
        const signature = await walletProvider.sendTransaction(
          transaction,
          connection
        );
  
        sendSwapResult(`Swap successful. Tx Signature: ${signature}`);
      } catch (error) {
        console.error("Swap failed:", error);
        sendSwapResult(`Swap failed: ${error.message}`);
      }
    };
  
    return (
      <div>
        <button onClick={handleSwap}>Swap Token</button>
      </div>
    );
  };
  
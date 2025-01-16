import { SwapController } from "@reown/appkit-core";
import { ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";

export const Swap = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromToken, setFromToken] = useState("SOL");
  const [toToken, setToToken] = useState("USDC");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [swapDetails, setSwapDetails] = useState(null);
  const { sourceToken } = SwapController.state;

  useEffect(() => {
    console.log(sourceToken)
    const initializeSwap = async () => {
      const resp1 = await SwapController.initializeState();
      const resp2 = await SwapController.fetchTokens();
      console.log(resp1);
      console.log(resp2);
    };

    initializeSwap();
  }, []);

  // useEffect(() => {
  //   const updateTokenPrices = async () => {
  //     if (!fromAmount) return;

  //     try {
  //       setIsLoading(true);

  //       // Get token details from the controller's state
       
  //       const { sourceToken, toToken } = SwapController.state;

        

  //       if (sourceToken?.address && toToken?.address) {
  //         // Update prices
  //         await SwapController.setTokenPrice(
  //           sourceToken.address,
  //           "sourceToken"
  //         );
  //         await SwapController.setTokenPrice(toToken.address, "toToken");

  //         // Get updated amounts and prices
  //         const {
  //           toTokenAmount,
  //           sourceTokenPriceInUSD,
  //           toTokenPriceInUSD,
  //           gasFee,
  //           priceImpact,
  //           slippage,
  //         } = SwapController.state;

  //         setToAmount(toTokenAmount);

  //         // Update swap details
  //         setSwapDetails({
  //           exchangeRate: (sourceTokenPriceInUSD / toTokenPriceInUSD).toFixed(
  //             6
  //           ),
  //           networkFee: gasFee,
  //           slippage: slippage,
  //           priceImpact: priceImpact,
  //         });
  //       }
  //     } catch (err) {
  //       console.error("Failed to update prices:", err);
  //       setError("Failed to fetch token prices");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   updateTokenPrices();
  // }, [fromAmount, fromToken, toToken]);

  // const handleFromAmountChange = (value: string) => {
  //   setFromAmount(value);
  //   SwapController.setSourceTokenAmount(value);
  // };

  // const handleTokenSwitch = () => {
  //   const tempToken = fromToken;
  //   setFromToken(toToken);
  //   setToToken(tempToken);
  //   SwapController.switchTokens();
  // };

  // const handleSwap = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError("");

  //     // Create and send the swap transaction
  //     const transaction = await SwapController.createSwapTransaction();

  //     if (transaction) {
  //       const txHash = await SwapController.sendTransactionForSwap(transaction);
  //       if (txHash) {
  //         console.log("Swap successful! Transaction hash:", txHash);
  //         // Reset form
  //         setFromAmount("");
  //         setToAmount("");
  //       } else {
  //         setError("Swap transaction failed");
  //       }
  //     } else {
  //       setError("Failed to create swap transaction");
  //     }
  //   } catch (err) {
  //     console.error("Swap failed:", err);
  //     setError("Swap failed: " + (err.message || "Unknown error"));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Swap Tokens</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6">
          {/* From Token */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">From</label>
            <div className="flex space-x-4">
              <select
                className="bg-gray-100 rounded-lg p-3 flex-grow"
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                disabled={isLoading}
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
                // onChange={(e) => handleFromAmountChange(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Swap Direction Button */}
          <div className="flex justify-center my-4">
            <button
              className="bg-green-100 p-2 rounded-full hover:bg-green-200 disabled:opacity-50"
             // onClick={handleTokenSwitch}
              disabled={isLoading}
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
                disabled={isLoading}
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
                readOnly
              />
            </div>
          </div>

          {/* Swap Details */}
          {swapDetails && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Exchange Rate</span>
                <span>
                  1 {fromToken} = {swapDetails.exchangeRate} {toToken}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Network Fee</span>
                <span>{swapDetails.networkFee} SOL</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Slippage</span>
                <span>{swapDetails.slippage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price Impact</span>
                <span
                  className={`${
                    Number(swapDetails.priceImpact) > 5
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {swapDetails.priceImpact}%
                </span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <button
            className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
           // onClick={handleSwap}
            disabled={isLoading || !fromAmount || !toAmount}
          >
            {isLoading ? "Processing..." : "Swap Tokens"}
          </button>
        </div>
      </div>
    </div>
  );
};

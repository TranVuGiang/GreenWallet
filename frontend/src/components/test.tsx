import { SwapController } from '@reown/appkit-core';
import { useEffect, useState } from 'react';


const SwapTokenComponent = () => {
  const [swapState, setSwapState] = useState(SwapController.state);

  useEffect(() => {
    const unsubscribe = SwapController.subscribe((newState) => {
        console.log(newState);
      setSwapState(newState);
    });

    // Khởi tạo controller
    (async () => {
      await SwapController.initializeState();
    })();

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {swapState.loadingPrices ? (
        <p>Loading token prices...</p>
      ) : (
        <p>Source Token: {swapState.sourceToken?.symbol}</p>
      )}
    </div>
  );
};

export default SwapTokenComponent;

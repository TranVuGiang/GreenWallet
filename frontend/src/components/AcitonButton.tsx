import { useAppKit, useAppKitNetwork, useDisconnect } from '@reown/appkit/react';
import { networks } from '../config';

export const ActionButtonList = () => {
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();
    const { switchNetwork } = useAppKitNetwork();

    return (
        <div className="flex gap-4 p-6">
            <button 
                onClick={() => open()} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
            >
                Open
            </button>
            <button 
                onClick={() => disconnect()} 
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium shadow-sm"
            >
                Disconnect
            </button>
            <button 
                onClick={() => switchNetwork(networks[1])}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-sm"
            >
                Switch
            </button>
        </div>
    );
};
import {
    useAppKitAccount,
    useAppKitEvents,
    useAppKitState,
    useAppKitTheme,
    useWalletInfo
} from '@reown/appkit/react';
import { useEffect } from 'react';

export const InfoList = () => {
    const { themeMode, themeVariables } = useAppKitTheme();
    const state = useAppKitState();
    const {address, caipAddress, isConnected, status} = useAppKitAccount();
    const events = useAppKitEvents()
    const walletInfo = useWalletInfo()

    useEffect(() => {
        console.log("Events: ", events);
    }, [events]);

    return (
        <div className="p-6 space-y-6 bg-gray-50 rounded-lg shadow-sm">
            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-800">useAppKit</h2>
                <pre className="p-4 bg-white rounded-md shadow-sm text-sm text-gray-600 font-mono">
                    Address: {address}<br />
                    caip Address: {caipAddress}<br />
                    Connected: {isConnected.toString()}<br />
                    Status: {status}<br />
                </pre>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-800">Theme</h2>
                <pre className="p-4 bg-white rounded-md shadow-sm text-sm text-gray-600 font-mono">
                    Theme: {themeMode}<br />
                    ThemeVariables: {JSON.stringify(themeVariables, null, 2)}<br />
                </pre>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-800">State</h2>
                <pre className="p-4 bg-white rounded-md shadow-sm text-sm text-gray-600 font-mono">
                    activeChain: {state.activeChain}<br />
                    loading: {state.loading.toString()}<br />
                    open: {state.open.toString()}<br />
                    selectedNetworkId: {state.selectedNetworkId?.toString()}<br />
                </pre>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-800">WalletInfo</h2>
                <pre className="p-4 bg-white rounded-md shadow-sm text-sm text-gray-600 font-mono">
                    Name: {walletInfo.walletInfo?.name?.toString()}<br />
                </pre>
            </section>
        </div>
    );
};
import {
    useAppKitAccount,
    useAppKitEvents,
    useAppKitState,
    useAppKitTheme,
    useWalletInfo
} from '@reown/appkit/react';
import SwapTokenComponent from './test';


interface InfoListProps {
    hash: string | undefined;
    signedMsg: string;
    balance: string;
}

export const InfoList = ({ hash, signedMsg, balance }: InfoListProps) => {
    const { themeMode, themeVariables } = useAppKitTheme();
    const state = useAppKitState();
    const {address, caipAddress, isConnected, status} = useAppKitAccount();
    const events = useAppKitEvents()
    const walletInfo = useWalletInfo()

    // useEffect(() => {
    //     const fetchedInfo = async() => {
    //         try {
    //             await SwapController.getTokenList();
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // })

    return (
        <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
            {balance && (
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Balance</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-200">{balance}</p>
                </section>
            )}
            <SwapTokenComponent />
            {hash && (
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Sign Tx</h2>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
                        <span className="block">
                            <span className="text-gray-600 dark:text-gray-400">Hash: </span>
                            <span className="text-gray-800 dark:text-gray-200">{hash}</span>
                        </span>
                        <span className="block mt-2">
                            <span className="text-gray-600 dark:text-gray-400">Status: </span>
                            {/* <span className="text-gray-800 dark:text-gray-200">{receipt?.status.toString()}</span> */}
                        </span>
                    </pre>
                </section>
            )}

            {signedMsg && (
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Sign msg</h2>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
                        <span className="text-gray-600 dark:text-gray-400">signedMsg: </span>
                        <span className="text-gray-800 dark:text-gray-200">{signedMsg}</span>
                    </pre>
                </section>
            )}

            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">useAppKit</h2>
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
                    <span className="block">
                        <span className="text-gray-600 dark:text-gray-400">Address: </span>
                        <span className="text-gray-800 dark:text-gray-200">{address}</span>
                    </span>
                    <span className="block mt-2">
                        <span className="text-gray-600 dark:text-gray-400">caip Address: </span>
                        <span className="text-gray-800 dark:text-gray-200">{caipAddress}</span>
                    </span>
                    <span className="block mt-2">
                        <span className="text-gray-600 dark:text-gray-400">Connected: </span>
                        <span className="text-gray-800 dark:text-gray-200">{isConnected.toString()}</span>
                    </span>
                    <span className="block mt-2">
                        <span className="text-gray-600 dark:text-gray-400">Status: </span>
                        <span className="text-gray-800 dark:text-gray-200">{status}</span>
                    </span>
                </pre>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Theme</h2>
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
                    <span className="block">
                        <span className="text-gray-600 dark:text-gray-400">Theme: </span>
                        <span className="text-gray-800 dark:text-gray-200">{themeMode}</span>
                    </span>
                    <span className="block mt-2">
                        <span className="text-gray-600 dark:text-gray-400">ThemeVariables: </span>
                        <span className="text-gray-800 dark:text-gray-200">{JSON.stringify(themeVariables, null, 2)}</span>
                    </span>
                </pre>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">State</h2>
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
                    <span className="block">
                        <span className="text-gray-600 dark:text-gray-400">activeChain: </span>
                        <span className="text-gray-800 dark:text-gray-200">{state.activeChain}</span>
                    </span>
                    <span className="block mt-2">
                        <span className="text-gray-600 dark:text-gray-400">loading: </span>
                        <span className="text-gray-800 dark:text-gray-200">{state.loading.toString()}</span>
                    </span>
                    <span className="block mt-2">
                        <span className="text-gray-600 dark:text-gray-400">open: </span>
                        <span className="text-gray-800 dark:text-gray-200">{state.open.toString()}</span>
                    </span>
                    <span className="block mt-2">
                        <span className="text-gray-600 dark:text-gray-400">selectedNetworkId: </span>
                        <span className="text-gray-800 dark:text-gray-200">{state.selectedNetworkId?.toString()}</span>
                    </span>
                </pre>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">WalletInfo</h2>
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
                    <span className="block">
                        <span className="text-gray-600 dark:text-gray-400">Name: </span>
                        <span className="text-gray-800 dark:text-gray-200">{walletInfo.walletInfo?.name?.toString()}</span>
                    </span>
                </pre>
            </section>
        </div>
    );
}
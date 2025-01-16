import { mainnet } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { useState } from 'react'
import { ActionButtonList } from './components/ActionButton'
import { InfoList } from './components/InfoList'
import { metadata, networks, projectId, solanaWeb3JsAdapter } from './config'


// Create modal
createAppKit({
  projectId,
  metadata,
  themeMode: 'light',
  networks: networks,
  adapters: [solanaWeb3JsAdapter],
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    swaps: true
  },
  defaultNetwork: mainnet,
  tokens: {
    "eip155:1": {
      address: '0xa74cfa84257E20E768383F6E188425809B89dE60',
      image: 'token_image_url' //optional
    },
    "eip155:137": {
      address: '0xa74cfa84257E20E768383F6E188425809B89dE60',
      image: 'token_image_url' //optional
    }
  }
})

export function App() {
  const [transactionHash, setTransactionHash] = useState<string | undefined>(undefined);
  const [signedMsg, setSignedMsg] = useState('');
  const [balance, setBalance] = useState('');

  const receiveHash = (hash: string) => {
    setTransactionHash(hash); // Update the state with the transaction hash
  };

  const receiveSignedMsg = (signedMsg: string) => {
    setSignedMsg(signedMsg); // Update the state with the transaction hash
  };

  const receivebalance = (balance: string) => {
    setBalance(balance)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src="/reown.svg" alt="Reown" style={{ width: '150px', height: '150px' }} />
      <h2>Reown AppKit + Solana</h2>
      <appkit-button />
      <ActionButtonList sendHash={receiveHash} sendSignMsg={receiveSignedMsg} sendBalance={receivebalance}/>
      <div className="advice">
        <p>
          This projectId only works on localhost. <br/>
          Go to <a href="https://cloud.reown.com" target="_blank" className="link-button" rel="Reown Cloud">Reown Cloud</a> to get your own.
        </p>
      </div>
      <InfoList hash={transactionHash} signedMsg={signedMsg} balance={balance}/>
    </div>
  )
}

export default App
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import ConnectCard from '../components/ConnectCard';
import SignMessage from '../components/SignMessage';
import WalletDetails from '../components/WalletDetails';

import { injected as MetaMaskConnector } from '../../connectors';
import {
  ProviderType,
  activateInjectedProvider,
} from '../../utils/setInjectedConnector';

const Home = () => {
  const { account, active, activate } = useWeb3React();

  useEffect(() => {
    const handleAccountsChanged = () => {
      try {
        console.log('Connecting Wallet');
        activateInjectedProvider(ProviderType.METAMASK);
        activate(MetaMaskConnector);
      } catch (error) {
        console.log('Error from connecting to metamask', error);
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };
    if (window.ethereum) {
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  return (
    <div>
      {account && active ? (
        <>
          <WalletDetails />
          <SignMessage />
        </>
      ) : (
        <ConnectCard />
      )}
    </div>
  );
};

export default Home;

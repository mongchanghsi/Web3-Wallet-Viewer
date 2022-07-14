import { useWeb3React } from '@web3-react/core';
import './index.scss';
import { injected as MetaMaskConnector } from '../../../connectors';
import {
  ProviderType,
  activateInjectedProvider,
} from '../../../utils/setInjectedConnector';

const ConnectCard = () => {
  const { activate } = useWeb3React();

  const handleConnect = async () => {
    try {
      console.log('Connecting Wallet');
      activateInjectedProvider(ProviderType.METAMASK);
      activate(MetaMaskConnector);
    } catch (error) {
      console.log('Error from connecting to metamask', error);
    }
  };

  return (
    <div id='ConnectCard'>
      <button type='button' onClick={handleConnect}>
        CONNECT WALLET
      </button>
    </div>
  );
};

export default ConnectCard;

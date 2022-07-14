import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { getDisplayAddress } from '../../../utils/index';
import { ethers } from 'ethers';
import './index.scss';
import { MoonLoader } from 'react-spinners';

const WalletDetails = () => {
  const { account, deactivate } = useWeb3React();

  const [fetching, setFetching] = useState<boolean>(true);
  const [chainId, setChainId] = useState<number>(0);
  const [balance, setBalance] = useState<string>('-');
  const [ensName, setENSName] = useState<string>('');
  const [ensAvatarUri, setENSAvatarUri] = useState<string>('');

  const initializeData = async (account: string) => {
    setFetching(true);

    const _selectedProvider = window.ethereum.providers
      ? window.ethereum.selectedProvider
      : window.ethereum;
    const provider = new ethers.providers.Web3Provider(_selectedProvider);

    // Look up ENS
    let name = await provider.lookupAddress(account);
    if (name) {
      // Perform a forward resolution to ensure that name is indeed account holder
      var address = await provider.resolveName(name);
      if (account === address) {
        setENSName(name);
      } else {
        setENSName('No ENS Name found');
        setENSAvatarUri('');
      }
    } else {
      setENSName('No ENS Name found');
      setENSAvatarUri('');
    }

    // Get ENS Avatar
    if (name) {
      const resolver = await provider.getResolver(name);
      const avatarUri = await resolver?.getText('avatar');
      if (avatarUri) {
        setENSAvatarUri(avatarUri);
      }
    }

    // Get ChainId
    const { chainId } = await provider.getNetwork();
    setChainId(chainId);

    // Get Balance on current network
    const balance = await provider.getBalance(account);
    const balanceInEth = Number(ethers.utils.formatEther(balance)).toFixed(4);
    setBalance(balanceInEth);

    setFetching(false);
  };

  useEffect(() => {
    if (account) {
      initializeData(account);
    }
  }, [account]);

  return (
    <div id='WalletDetails'>
      <h3>WALLET DETAILS</h3>

      {fetching ? (
        <MoonLoader size={50} />
      ) : (
        <>
          <p>
            <b>Chain ID:</b> {chainId}
          </p>

          <div id='Details'>
            <div id='Avatar'>
              {ensAvatarUri && (
                <img src={ensAvatarUri} alt={`ENSName_${ensName}_Avatar`} />
              )}
            </div>

            <p>
              <b>ENS Name:</b> {ensName}
            </p>
            <p>
              <b>Ethereum Address:</b> {getDisplayAddress(account)}
            </p>
            <p>
              <b>Current Balance:</b> {balance}
            </p>
          </div>

          <button type='button' onClick={deactivate}>
            DISCONNECT WALLET
          </button>
        </>
      )}
    </div>
  );
};

export default WalletDetails;

import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { ethers } from 'ethers';
import './index.scss';
import { MoonLoader } from 'react-spinners';

const SignMessage = () => {
  const { account } = useWeb3React();

  const [message, setMessage] = useState<string>('');
  const [signature, setSignature] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const signMessage = async () => {
    if (!account) return;

    setLoading(true);

    if (!message || message.length <= 0) return;

    const _selectedProvider = window.ethereum.providers
      ? window.ethereum.selectedProvider
      : window.ethereum;
    const provider = new ethers.providers.Web3Provider(_selectedProvider);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    setSignature(signature);
    setMessage('');

    setLoading(false);
  };

  return (
    <div id='SignMessage'>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Type in some message'
        disabled={loading}
      />
      <button type='button' onClick={signMessage} disabled={loading}>
        {loading ? <MoonLoader size={20} color='white' /> : 'SIGN MESSAGE'}
      </button>

      {signature && !loading && (
        <div id='DisplayMessage'>
          <p>
            <b>Signature:</b> <code>{signature}</code>
          </p>
          <p>
            <b>Public Key:</b> <code>{account}</code>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignMessage;

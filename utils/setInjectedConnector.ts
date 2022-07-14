declare global {
  interface Window {
    ethereum?: any;
  }
}

export enum ProviderType {
  COINBASE = 'COINBASE',
  METAMASK = 'METAMASK',
}

/*
The function below sets the default injected provider if the user's browser exist more than one injected provider AKA (Metamask and Coinbase).
*/
export const activateInjectedProvider = (providerName: ProviderType) => {
  const { ethereum } = window;

  if (!ethereum.providers) {
    return undefined;
  }

  let provider;
  switch (providerName) {
    case ProviderType.COINBASE:
      provider = ethereum.providers.find(
        ({ isCoinbaseWallet }: { isCoinbaseWallet: any }) => isCoinbaseWallet
      );
      break;
    case ProviderType.METAMASK:
      provider = ethereum.providers.find(
        ({ isMetaMask }: { isMetaMask: any }) => isMetaMask
      );
      break;
  }

  if (provider) {
    ethereum.setSelectedProvider(provider);
  }
};

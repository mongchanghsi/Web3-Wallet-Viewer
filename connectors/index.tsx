/* 
This file will include varies types of connectors from @web3-react
In the future can include wallets such as Coinbase and WalletConnect connectors here as well
*/

import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4, 31337],
});

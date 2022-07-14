# Wallet Details Checker

A simple dApps which connects the user wallet and retrieve the following information:

- Chain ID
- ENS Avatar
- ENS Name
- Wallet Address
- Balance

It also includes couple of functionality such as disconnecting the wallet as well as signing a simple message.

It will refetch information if you change account or change the chain.

It is also web responsive for wide-screens and mobile devices.

## Demo

You can access the project via [https://web3-wallet-viewer.vercel.app/](https://web3-wallet-viewer.vercel.app/)

## Technology used

This project uses React, Ethers.js, Typescript, SCSS and Web3React.

Why was Web3React used because it allows for future expansion of other wallets to be used such as Coinbase and WalletConnect. There are also functions in place to ensure that only Metamask injected provider is used as there are issues between browsers with BOTH Metamask and Coinbase browser extension.

This project used minimal 3rd parties libraries except for a few to further enhance the experience for UIUX such as react-spinners.

## How to start locally

1. Run `npm install`
2. Run `npm run start`
3. Access it via `localhost:3000`

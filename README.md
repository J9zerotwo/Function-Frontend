# ATM & Savings & Investment System

This is a decentralized application (DApp) that allows users to interact with an ATM-like system using Ethereum. Users can deposit and withdraw funds from their ATM balance, savings account, and investment account through a smart contract on the Ethereum blockchain.

## Features
- **ATM Balance**: Deposit and withdraw funds in your ATM balance.
- **Savings Balance**: Deposit and withdraw funds into/from your savings account.
- **Investment Balance**: Deposit and withdraw funds into/from your investment account.
- **Account Privacy**: Toggle the visibility of your Ethereum account address for privacy.

## Tech Stack
- **Smart Contract**: Solidity (Ethereum)
- **Frontend**: React, Next.js
- **Blockchain**: Ethereum, MetaMask (for connecting to the blockchain)
- **Web3**: Ethers.js

## Setup & Installation

### Prerequisites
- **MetaMask** wallet extension installed in your browser.
- **Node.js** and **npm** installed.
- **Ethereum** account with some Ether for transactions (you can use testnets for development).

### 1. Clone the repository
```bash
git clone https://github.com/your-username/atm-savings-investment-system.git
cd atm-savings-investment-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Deploy Smart Contract

To deploy the smart contract, you’ll need an Ethereum wallet (e.g., MetaMask) and a testnet like **Rinkeby** or **Goerli** for development.

- Compile and deploy the smart contract using **Remix IDE** or **Hardhat**.

For example, with Hardhat:
```bash
npx hardhat run scripts/deploy.js --network rinkeby
```

Make sure to update the `contractAddress` in the `index.js` file with the address of the deployed contract.

### 4. Run the Frontend

To start the DApp, run the following command:
```bash
npm run dev
```

This will start a local development server at `http://localhost:3000`. Open it in your browser, and the application should be ready for use.

### 5. Interacting with the DApp

1. **Connect your MetaMask Wallet**: Click the "Connect MetaMask Wallet" button. This will prompt MetaMask to allow you to connect your Ethereum account to the DApp.
2. **Deposit/Withdraw funds**: 
   - Deposit funds into your ATM balance, savings account, or investment account.
   - Withdraw funds from any of the three accounts.
3. **Account Privacy**: Toggle the visibility of your Ethereum account address by clicking the eye icon next to "Your Account".

### Here's the preview of the page:

![image](https://github.com/user-attachments/assets/a3d14fcb-4dd9-426c-a7dc-b96926d51af7)

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [savingsBalance, setSavingsBalance] = useState(undefined);
  const [investmentBalance, setInvestmentBalance] = useState(undefined);
  const [isAccountVisible, setIsAccountVisible] = useState(true); // Toggle visibility

  const contractAddress = "0x9A676e781A523b5d0C0e43731313A708CB607508";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const getSavingsBalance = async () => {
    if (atm) {
      const savingsBal = await atm.getSavingsBalance();
      setSavingsBalance(savingsBal.toNumber());
    }
  };

  const getInvestmentBalance = async () => {
    if (atm) {
      const investmentBal = await atm.getInvestmentBalance();
      setInvestmentBalance(investmentBal.toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1); // Deposit ATM
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1); // Withdraw ATM
      await tx.wait();
      getBalance();
    }
  };

  const depositToSavings = async () => {
    if (atm) {
      let tx = await atm.savingsDeposit(1); // Deposit Savings
      await tx.wait();
      getSavingsBalance();
      alert("1 ETH deposited into Savings Balance!");
    }
  };

  const withdrawFromSavings = async () => {
    if (atm) {
      let tx = await atm.savingsWithdraw(1); // Withdraw Savings
      await tx.wait();
      getSavingsBalance();
      alert("Savings withdrawal successful!");
    }
  };

  const invest = async () => {
    if (atm) {
      let tx = await atm.investmentDeposit(1); // Deposit Investment
      await tx.wait();
      getInvestmentBalance();
      alert("1 ETH invested!");
    }
  };

  const withdrawInvestment = async () => {
    if (atm) {
      let tx = await atm.investmentWithdraw(1); // Withdraw Investment
      await tx.wait();
      getInvestmentBalance();
      alert("Investment withdrawal successful!");
    }
  };

  const toggleAccountVisibility = () => {
    setIsAccountVisible(!isAccountVisible);
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this application.</p>;
    }

    if (!account) {
      return (
          <button onClick={connectAccount}>
            Connect MetaMask Wallet
          </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    if (savingsBalance === undefined) {
      getSavingsBalance();
    }

    if (investmentBalance === undefined) {
      getInvestmentBalance();
    }

    return (
        <div>
          <p>
            Your Account: {isAccountVisible ? account : '•••••••••••••••••••••'}
            <button onClick={toggleAccountVisibility} style={{ marginLeft: '10px' }}>
              {isAccountVisible ? '👁‍' : '👁'}
            </button>
          </p>
          <p>ATM Balance: {balance} ETH</p>
          <div>
            <button onClick={deposit}>Deposit 1 ETH</button>
            <button onClick={withdraw}>Withdraw 1 ETH</button>
          </div>
          <p>Savings Balance: {savingsBalance} ETH</p>
          <button onClick={depositToSavings}>Deposit to Savings (1 ETH)</button>
          <button onClick={withdrawFromSavings}>Withdraw from Savings (1 ETH)</button>
          <p>Investment Balance: {investmentBalance} ETH</p>
          <button onClick={invest}>Invest 1 ETH</button>
          <button onClick={withdrawInvestment}>Withdraw Investment (1 ETH)</button>
        </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
      <main className="container">
        <header>
          <h1>Welcome to the ATM & Savings & Investment System!</h1>
        </header>
        {initUser()}
        <style jsx>{`
          .container {
            text-align: center;
            font-family: Arial, sans-serif;
            padding: 180px;
            background-color: lavender;
          }
        `}</style>
      </main>
  );
}

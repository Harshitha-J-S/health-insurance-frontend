import React from 'react';
import { useEffect, useState } from "react";

const WalletConnect = ({ setWalletAddress }) => {
  const [status, setStatus] = useState("🦊 Connect to MetaMask using the button below.");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
        setStatus("✅ Wallet connected!");
      } catch (error) {
        setStatus("❌ Connection failed.");
      }
    } else {
      setStatus("🦊 Please install MetaMask.");
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      <p>{status}</p>
    </div>
  );
};

export default WalletConnect;

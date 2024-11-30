import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
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
    if (account.length > 0) {
      console.log("Account connected: ", account);
      setAccount(account[0]);
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

    // Once wallet is set, get a reference to our deployed contract
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
      const balance = await atm.getBalance();
      setBalance(balance);
    }
  };

  const deposit = async () => {
    if (atm) {
      try {
        setLoading(true);
        setError("");
        const amount = ethers.utils.parseEther(depositAmount.toString());
        const tx = await atm.deposit(amount);
        await tx.wait();
        getBalance();
      } catch (e) {
        console.error(e);
        setError("Failed to deposit funds. Ensure you are the owner.");
      } finally {
        setLoading(false);
      }
    }
  };

  const withdraw = async () => {
    if (atm) {
      try {
        setLoading(true);
        setError("");
        const amount = ethers.utils.parseEther(withdrawAmount.toString());
        const tx = await atm.withdraw(amount);
        await tx.wait();
        getBalance();
      } catch (e) {
        console.error(e);
        setError("Failed to withdraw funds. Ensure you have sufficient balance.");
      } finally {
        setLoading(false);
      }
    }
  };

  const initUser = () => {
    // Check if the user has MetaMask installed
    if (!ethWallet) {
      return <p>Please install MetaMask to use this ATM.</p>;
    }

    // Check if the user is connected; if not, provide a button to connect
    if (!account) {
      return <button onClick={connectAccount}>Connect MetaMask Wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div className="user-interface">
        <div className="account-info">
          <h3>Account Information</h3>
          <p><strong>Account:</strong> {account}</p>
          <p><strong>Balance:</strong> {balance && ethers.utils.formatEther(balance)} ETH</p>
        </div>

        {loading && <p className="loading">Processing transaction...</p>}
        {error && <p className="error">{error}</p>}

        <div className="actions">
          <div className="action-box">
            <h4>Deposit Funds</h4>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Enter deposit amount"
            />
            <button onClick={deposit} disabled={loading}>Deposit</button>
          </div>

          <div className="action-box">
            <h4>Withdraw Funds</h4>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Enter withdraw amount"
            />
            <button onClick={withdraw} disabled={loading}>Withdraw</button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Ethereum ATM!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          background-color: #f4f4f9;
          color: #333;
          font-family: Arial, sans-serif;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          max-width: 600px;
          margin: 20px auto;
        }
        .user-interface {
          margin-top: 20px;
        }
        .account-info {
          background-color: #e7f3ff;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
        }
        .actions {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }
        .action-box {
          flex: 1;
          background-color: #fff;
          border: 1px solid #ccc;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .action-box h4 {
          margin-bottom: 10px;
        }
        input {
          width: calc(100% - 20px);
          padding: 5px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 8px 12px;
          border-radius: 5px;
          cursor: pointer;
        }
        button:disabled {
          background-color: #b3d7ff;
        }
        .loading {
          color: #ffa500;
        }
        .error {
          color: #ff4d4f;
        }
      `}</style>
    </main>
  );
}

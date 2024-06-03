import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ethers } from "ethers";
import { abi } from "./abi.json";

function App() {
  const mainAddress: string = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const contractAddress: string = "0x48B16b015F0495a637A18B133D18156524CF10cC";
  const [provider, setProvider] = useState<ethers.JsonRpcProvider | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [collateral, setCollateral] = useState<string | null>(null);
  const [borrowedAmount, setBorrowedAmount] = useState<string | null>(null);
  const [borrowedAmountInUSDC, setBorrowedAmountInUSDC] = useState("1");
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  async function getTotalSuppliedAmount(_contract: ethers.Contract) {
    try {
      const collateralBalance = await _contract.getTotalSuppliedAmount(mainAddress);
      setCollateral((BigInt(collateralBalance) / BigInt(10 ** 8)).toString());
    } catch (error) {
      console.error("Error getting total supplied amount:", error);
    }
  }

  async function getBalance(_provider: ethers.JsonRpcApiProvider) {
    try {
      const _balance = await _provider.getBalance(mainAddress);
      setBalance((BigInt(_balance) / BigInt(10 ** 18)).toString());
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  }

  async function borrowAssets(_contract: ethers.Contract) {
    try {
      const _borrowedAmount = await _contract.getTotalBorrowedAmount(mainAddress);
      console.log("Borrowed Amount:", _borrowedAmount); // Add this line
      setBorrowedAmount((BigInt(_borrowedAmount) / BigInt(10 ** 8)).toString());
    } catch (error) {
      console.error("Error getting borrowed amount:", error);
    }
  }

  useEffect(() => {
    const _provider = new ethers.JsonRpcProvider("http://localhost:8545");
    const wallet = new ethers.Wallet(
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      _provider
    );
    const _contract = new ethers.Contract(
      contractAddress,
      abi,
      wallet
    );
    setContract(() => _contract);
    getTotalSuppliedAmount(_contract);
    getBalance(_provider);
    borrowAssets(_contract);
    setProvider(() => _provider);
  }, []);

  return (
    <>
      <div>
        <h1>Compound</h1>
        <div className="buttonLabel">
          {balance && (
            <h2>Balance : {balance} ETH</h2>
          )}
          {provider && (
            <button
              onClick={async () => {
                getBalance(provider);
              }}
            >
              Refresh
            </button>
          )}
        </div>
        <div className="buttonLabel">
          <h2>
            BorrowedAmount : {borrowedAmount ? (Number(borrowedAmount) / 10 ** 8)?.toString() : "0"} USDC
          </h2>

          {contract && (
            <button
              onClick={async () => {
                borrowAssets(contract);
              }}
            >
              Refresh
            </button>
          )}
      </div>
        <div className="buttonLabel">
          {collateral && (
            <h2>
              balance : {balance} USDC
            </h2>
          )}
          {contract && (
            <button
              onClick={async () => {
                getTotalSuppliedAmount(contract);
              }}
            >
              Total Supplied
            </button>
          )}
        </div>
        {contract && (
          <div>
            <button
              onClick={async () => {
                const value = ethers.parseEther("2");
                const tx = await contract.supplyCollateral({
                  value: value,
                  gasLimit: 10000000,
                });
                console.log(tx);
                await tx.wait();
                getTotalSuppliedAmount(contract);
              }}
            >
              Supply COMP
            </button>
          </div>
        )}
        {contract && (
          <div>
          <button
            onClick={async () => {
              try {
                const tx = await contract.getTotalBorrowedAmount(
                  ethers.parseUnits(borrowedAmountInUSDC, 6),
                  { gasLimit: 10000000 }
                );
                console.log(tx);
                await tx.wait();
                borrowAssets(contract);
              } catch (error) {
                console.error("Error borrowing assets:", error);
              }
            }}
          >
            Borrow USDC
          </button>
          <input
            type="number"
            value={borrowedAmountInUSDC}
            onChange={(e) => setBorrowedAmountInUSDC(e.target.value)}
          />
        </div>
      )}
    </div>
  </>
);
}

export default App;
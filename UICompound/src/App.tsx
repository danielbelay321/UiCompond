import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ethers } from "ethers";
import abi from "./abi.json";

import "./App.css";
const ReturnPromise = () => {
  type JSONRPC = ethers.JsonRpcProvider;

  const [provider, setProvider] = useState<JSONRPC>();
  const [signer, setSigner] = useState<ethers.Signer>();
  const [contract, setContract] = useState<ethers.Contract>();
  useEffect(() => {
    const providerDetails = async () => {
      const provider1 = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      // const signer1 = await provider.listAccounts();
      const signer1 = await provider1.getSigner(2);
      const signer2 = await provider1.getSigner(3);

      const contractPool = new ethers.Contract(
        "0xec9eaEbE247aAbEC55B87C474760a8af74c3d9EA",
        abi.abi,
        signer1
      );
      // ethers;
      const balanceValue = await contractPool.BalanceCheck();

      console.log(ethers.toBigInt(balanceValue.data), signer1, signer2);

      setProvider(provider1);
      setSigner(signer1);
      setContract(contractPool);
    };

    providerDetails();
  }, []);

  return [provider, signer, contract];
};

function App() {
  const [count, setCount] = useState(0);

  const [provider, signer, contract] = ReturnPromise();
  console.log(provider, signer, contract);
  if (contract) {
  }
  // console.log(providerDetails);
  // const;
  // console

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

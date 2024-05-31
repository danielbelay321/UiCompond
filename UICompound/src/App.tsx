// import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import { ethers } from "ethers";
// import abi from "./abi.json";

// import "./App.css";
// const ReturnPromise = () => {
//   type JSONRPC = ethers.JsonRpcProvider;

//   const [provider, setProvider] = useState<JSONRPC>();
//   const [signer, setSigner] = useState<ethers.Signer>();
//   const [contract, setContract] = useState<ethers.Contract>();
//   useEffect(() => {
//     const providerDetails = async () => {
//       const provider1 = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
//       // const signer1 = await provider.listAccounts();
//       const signer1 = await provider1.getSigner(2);
//       const signer2 = await provider1.getSigner(3);

//       const contractPool = new ethers.Contract(
//         "0xec9eaEbE247aAbEC55B87C474760a8af74c3d9EA",
//         abi.abi,
//         signer1
//       );
//       // ethers;
//       const balanceValue = await contractPool.BalanceCheck();

//       console.log(ethers.toBigInt(balanceValue.data), signer1, signer2);

//       setProvider(provider1);
//       setSigner(signer1);
//       setContract(contractPool);
//     };

//     providerDetails();
//   }, []);

//   return [provider, signer, contract];
// };

// function App() {
//   const [count, setCount] = useState(0);

//   const [provider, signer, contract] = ReturnPromise();
//   console.log(provider, signer, contract);
//   if (contract) {
//   }
//   // console.log(providerDetails);
//   // const;
//   // console

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   );
// }

// export default App;
// import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import { ethers } from "ethers";
// import abi from "./abi.json";
// import "./App.css";

// interface providerDetails{
//   provider:ethers.JsonRpcProvider,
//   signer:ethers.JsonRpcSigner,
//   contract:ethers.Contract,
//   handleSupply:function,
//   totalSupplied:string,
//   supplyAmtHandler:function,
//   supplyAmount:number
// }

// const LendingAndBorrowingUI = (opts:providerDetails) => {
//   // Define supplyAmount state within the component
  

//   return (
//     <div>
//       <h2>Lending and Borrowing Interface</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="Supply Amount"
//           value={supplyAmount}
//           onChange={(e) => supplyAmtHandler(e.target.value)}
//         />
//         <button onClick={handleSupply}>Supply Collateral</button>
//       </div>
//       <div>
//         <p>Total Supplied: {totalSupplied}</p>
//       </div>
//     </div>
//   );
// };

// function App() {
//   const [provider, setProvider] = useState<ethers.JsonRpcProvider>();
//   const [signer, setSigner] = useState<ethers.JsonRpcSigner>();
//   const [contract, setContract] = useState<ethers.Contract>();
//   const [totalSupplied, setTotalSupplied] = useState<string>("");
//   const [supplyAmount, setSupplyAmount] = useState<number>();

//   useEffect(() => {
//     const providerDetails = async () => {
//       const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
//       const signer = await provider.getSigner(0);
//       const contract = new ethers.Contract(
//         "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
//         abi.abi,
//         signer
//       );

//       setProvider(provider);
//       setSigner(signer);
//       setContract(contract);
//     };

//     providerDetails();
//   }, []);

//   // Fix: Pass supplyAmount as an argument to handleSupply function
//   const handleSupply = async () => {
//     if (contract) {
//       const tx = await contract.supplyCollateral(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, ethers.parseUnits(supplyAmount, 18));
//       await tx.wait();
//       alert("Collateral supplied successfully");
//       const newTotalSupplied = await contract.getTotalSuppliedAmount(signer?.address);
//       setTotalSupplied(ethers.formatUnits(newTotalSupplied, 18));
//     }
//   };

//   useEffect(() => {
//     if (contract) {
//       fetchContractData();
//     }
//   }, [contract]);

//   const fetchContractData = async () => {
//     if (contract) {
//       const supplied = await contract.getTotalSuppliedAmount(signer?.getAddress());
//       setTotalSupplied(ethers.formatUnits(supplied, 18));
//     }
//   };

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <LendingAndBorrowingUI
//           provider={provider}
//           signer={signer}
//           contract={contract}
//           handleSupply={handleSupply} // Pass supplyAmount here
//           totalSupplied={totalSupplied}
//           supplyAmtHandler={setSupplyAmount}

//         />
//       </div>
//     </>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ethers } from "ethers";
import abi from "./abi.json";
import "./App.css";

interface ProviderDetails {
  provider: ethers.JsonRpcProvider;
  signer: ethers.JsonRpcSigner;
  contract: ethers.Contract;
  handleSupply: Function;
  totalSupplied: string;
  supplyAmtHandler: Function;
  supplyAmount: string;
}

const LendingAndBorrowingUI = (opts: ProviderDetails) => {
  return (
    <div>
      <h2>Lending and Borrowing Interface</h2>
      <div>
        <input
          type="text"
          placeholder="Supply Amount"
          value={opts.supplyAmount}
          onChange={(e) => opts.supplyAmtHandler(e.target.value)}
        />
        <button onClick={() => opts.handleSupply()}>Supply Collateral</button>
      </div>
      <div>
        <p>Total Supplied: {opts.totalSupplied}</p>
      </div>
    </div>
  );
};

function App() {
  const [provider, setProvider] = useState<ethers.JsonRpcProvider>();
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>();
  const [contract, setContract] = useState<ethers.Contract>();
  const [totalSupplied, setTotalSupplied] = useState<string>("");
  const [supplyAmount, setSupplyAmount] = useState<string>("");

  useEffect(() => {
    const initProviderDetails = async () => {
      try {
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // Ensure this is the correct address
          abi.abi,
          signer
        );

        setProvider(provider);
        setSigner(signer);
        setContract(contract);
      } catch (error) {
        console.error("Error initializing provider details:", error);
      }
    };

    initProviderDetails();
  }, []);

  const handleSupply = async () => {
    if (contract && signer) {
      try {
        const parsedAmount = ethers.utils.parseUnits(supplyAmount, 18);
        const tx = await contract.supplyCollateral(
          "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", // token address (example)
          parsedAmount
        );
        await tx.wait();
        alert("Collateral supplied successfully");
        fetchContractData();
      } catch (error) {
        console.error("Error supplying collateral:", error);
      }
    } else {
      console.error("Contract or signer is undefined");
    }
  };

  const fetchContractData = async () => {
    if (contract && signer) {
      try {
        const userAddress = await signer.getAddress(); // Ensure this is correctly awaited
        console.log("User address:", userAddress);
        // const contract = new ethers.Contract(userAddress, contractABI, provider);
        const supplied = await contract.getTotalSuppliedAmount(await signer.getAddress());
        console.log("Supplied amount raw:", supplied);
        setTotalSupplied(ethers.utils.formatUnits(supplied, 18));
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    }
  };

  useEffect(() => {
    if (contract && signer) {
      fetchContractData();
    }
  }, [contract, signer]);

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
        {provider && signer && contract && (
          <LendingAndBorrowingUI
            supplyAmount={supplyAmount}
            provider={provider}
            signer={signer}
            contract={contract}
            handleSupply={handleSupply}
            totalSupplied={totalSupplied}
            supplyAmtHandler={setSupplyAmount}
          />
        )}
      </div>
    </>
  );
}

export default App;
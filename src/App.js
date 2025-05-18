import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import SubmitClaim from "./SubmitClaim";
import AllClaims from "./AllClaims";
import HealthInsurance from "./abi/HealthInsurance.json";

const contractAddress = "0xCb7B19B5B2D8117e815566A59Fc9596952c17273"; // deployed address

function App() {
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);
  const [totalClaims, setTotalClaims] = useState(0); // new state

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signerInstance = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, HealthInsurance.abi, signerInstance);
      setContract(contractInstance);
      setSigner(signerInstance);

      // ✅ Fetch total claims after contract is connected
      try {
        const count = await contractInstance.getTotalClaims();
        setTotalClaims(count.toString());
        console.log("Total claims:", count.toString());
      } catch (err) {
        console.error("Error fetching total claims:", err);
      }
    };

    init();
  }, []);

  return (
    <div>
      <h1>Health Insurance DApp</h1>
      <p>Total Claims Submitted: {totalClaims}</p> {/* ✅ Show the value */}
      {contract && signer ? (
        <>
          <SubmitClaim contract={contract} signer={signer} />
          <hr />
          <AllClaims contract={contract} />
        </>
      ) : (
        <p>Connecting to blockchain...</p>
      )}
    </div>
  );
}

export default App;

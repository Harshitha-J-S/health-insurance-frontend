import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import SubmitClaim from "./SubmitClaim";
import AllClaims from "./AllClaims";
import HealthInsurance from "./abi/HealthInsurance.json";

const contractAddress = "0xCb7B19B5B2D8117e815566A59Fc9596952c17273";

function App() {
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);
  const [totalClaims, setTotalClaims] = useState(0);

  const fetchTotalClaims = async (contractInstance) => {
    if (contractInstance) {
      const count = await contractInstance.getTotalClaims();
      setTotalClaims(count.toNumber());
    }
  };

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signerInstance = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, HealthInsurance.abi, signerInstance);
      setContract(contractInstance);
      setSigner(signerInstance);
      fetchTotalClaims(contractInstance); // initial load
    };
    init();
  }, []);

  return (
    <div>
      <h1>Health Insurance DApp</h1>
      {contract && signer ? (
        <>
          <p><strong>Total Claims Submitted:</strong> {totalClaims}</p>
          <SubmitClaim contract={contract} signer={signer} onClaimSubmitted={() => fetchTotalClaims(contract)} />
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

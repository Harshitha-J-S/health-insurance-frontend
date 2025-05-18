// src/SubmitClaim.js
import React, { useState } from "react";

const SubmitClaim = ({ contract, signer }) => {
  const [patientId, setPatientId] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await contract.connect(signer).submitClaim(patientId, ipfsHash);
    alert("Claim submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
      <input placeholder="IPFS Hash" value={ipfsHash} onChange={(e) => setIpfsHash(e.target.value)} />
      <button type="submit">Submit Claim</button>
    </form>
  );
};

export default SubmitClaim;

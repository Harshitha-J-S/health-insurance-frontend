import React, { useState } from "react";

const SubmitClaim = ({ contract }) => {
  const [patientId, setPatientId] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.submitClaim(patientId, ipfsHash); // 🔥 MetaMask should trigger here
      await tx.wait();
      alert("✅ Claim submitted!");
      setPatientId("");
      setIpfsHash("");
    } catch (err) {
      console.error("Submission error:", err);
      alert("❌ Error submitting claim. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        required
      />
      <input
        placeholder="IPFS Hash"
        value={ipfsHash}
        onChange={(e) => setIpfsHash(e.target.value)}
        required
      />
      <button type="submit">Submit Claim</button>
    </form>
  );
};

export default SubmitClaim;

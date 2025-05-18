import React, { useState } from "react";

const SubmitClaim = ({ contract, signer, onClaimSubmitted }) => {
  const [patientId, setPatientId] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [txDetails, setTxDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.connect(signer).submitClaim(patientId, ipfsHash);
      const receipt = await tx.wait();

      setTxDetails({
        txHash: tx.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
      });

      alert("✅ Claim submitted!");
      setPatientId("");
      setIpfsHash("");

      if (onClaimSubmitted) {
        onClaimSubmitted(); // Update total claims
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting claim. Check console for details.");
    }
  };

  return (
    <>
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

      {txDetails && (
        <div style={{ marginTop: "1em", background: "#f2f2f2", padding: "10px", borderRadius: "5px" }}>
          <p><strong>Transaction Details</strong></p>
          <p><b>Tx Hash:</b> {txDetails.txHash}</p>
          <p><b>Block Number:</b> {txDetails.blockNumber}</p>
          <p><b>Gas Used:</b> {txDetails.gasUsed}</p>
        </div>
      )}
    </>
  );
};

export default SubmitClaim;

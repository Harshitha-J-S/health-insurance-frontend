import React, { useEffect, useState } from "react";

const AllClaims = ({ contract }) => {
  const [claims, setClaims] = useState([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const fetchClaims = async () => {
      const total = await contract.getTotalClaims();
      const fetchedClaims = [];

      for (let i = 0; i < total; i++) {
        const claim = await contract.getClaim(i);
        fetchedClaims.push({ id: i, ...claim });
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);

      setClaims(fetchedClaims);
    };

    fetchClaims();
  }, [contract]);

  const reviewClaim = async (id, approved, isFraud) => {
    try {
      const tx = await contract.reviewClaim(id, approved, isFraud);
      await tx.wait();
      alert("✅ Claim reviewed!");
      window.location.reload(); // Refresh to show updated claim status
    } catch (err) {
      console.error(err);
      alert("❌ Error reviewing claim. Make sure you're the admin.");
    }
  };

  return (
    <div>
      <h2>All Claims</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Claim ID</th>
            <th>Patient ID</th>
            <th>IPFS Hash</th>
            <th>Approved</th>
            <th>Is Fraud</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id}>
              <td>{claim.id}</td>
              <td>{claim.patientId}</td>
              <td>{claim.ipfsHash}</td>
              <td>{claim.approved.toString()}</td>
              <td>{claim.isFraud.toString()}</td>
              <td>
                <button onClick={() => reviewClaim(claim.id, true, false)}>Approve</button>
                <button onClick={() => reviewClaim(claim.id, false, true)}>Mark as Fraud</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllClaims;

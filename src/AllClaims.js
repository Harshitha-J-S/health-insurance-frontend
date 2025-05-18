import React, { useEffect, useState } from "react";

const AllClaims = ({ contract }) => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const total = await contract.getTotalClaims();
        const claimsArray = [];

        for (let i = 0; i < total; i++) {
          const claim = await contract.getClaim(i);
          claimsArray.push({
            patientId: claim.patientId,
            ipfsHash: claim.ipfsHash,
            approved: claim.approved,
            isFraud: claim.isFraud
          });
        }

        setClaims(claimsArray);
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };

    if (contract) {
      fetchClaims();
    }
  }, [contract]);

  return (
    <div>
      <h2>All Claims</h2>
      <table>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>IPFS Hash</th>
            <th>Approved</th>
            <th>Is Fraud</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim, index) => (
            <tr key={index}>
              <td>{claim.patientId}</td>
              <td>{claim.ipfsHash}</td>
              <td>{claim.approved.toString()}</td>
              <td>{claim.isFraud.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllClaims;

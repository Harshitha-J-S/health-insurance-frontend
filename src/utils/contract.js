import { ethers } from "ethers";
import ABI from "../abi/HealthInsurance.json";
import { CONTRACT_ADDRESS } from "../config";

export const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
};

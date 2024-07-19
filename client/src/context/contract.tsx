import {
  useAddress,
  useConnect,
  useContract,
  useContractWrite,
} from "@thirdweb-dev/react";
import { contractABI } from "@/contract/contractABI";
import { documentAddedABI } from "@/contract/documentAddedABI";
import { createContext, useContext, useEffect, useState } from "react";
import Moralis from "moralis";
import { EvmChain } from "moralis/common-evm-utils";
import { BigNumber } from "ethers";
import axios from "axios";

export enum DocumentType {
  Offer = 0,
  Promotion = 1,
  Resignation = 2,
  Termination = 3,
  ContractRenewal = 4,
  SalaryIncrease = 5,
  Bonus = 6,
  Transfer = 7,
  Warning = 8,
  EmploymentVerification = 9,
  JobDescription = 10,
  TrainingCompletion = 11,
  ProbationPeriodCompletion = 12,
  LeaveApproval = 13,
  Reference = 14,
  Relocation = 15,
  Retirement = 16,
  EndOfContract = 17,
  ChangeInEmploymentTerms = 18,
}

export interface EmploymentDocument {
  id: BigNumber;
  docType: number;
  encodedDocumentContent: string;
  timestamp: number;
  employee: string;
  signedByEmployee: boolean;
  signedByEmployer: boolean;
}

interface ContractContextProps {
  address: string | undefined;
  connect: any;
  contract: any;
  getEmployer: () => Promise<string | undefined>;
  addDocument: (
    employee: string,
    encodedDocumentContent: string,
    documentType: DocumentType
  ) => Promise<void>;
  signDocument: (documentIndex: number) => Promise<void>;
  getEmploymentDocuments: (
    employee: string
  ) => Promise<EmploymentDocument[] | undefined>;
  getAllEmploymentDocuments: () => Promise<EmploymentDocument[] | undefined>;
  getEventsTxHash: () => Promise<string[]>;
  getDecodedTx: (hash: string) => void;
  getLogsTxHash: () => void;
}

export const ContractContext = createContext<ContractContextProps | undefined>(
  undefined
);

export const ContractContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const contractAddress = "0xbE78fBf96DC5Dd4ca6105E86bE2AcF723E24C306";
  const { contract } = useContract(contractAddress, contractABI);
  const address = useAddress();
  const connect = useConnect();
  const chain = EvmChain.SEPOLIA;
  const topic =
    "0x1cbb29c3ad54216cfb2c9197ba0a15a31b8f8ec7124096c8390e60ddaaf52da6";
  const abi = documentAddedABI;
  const moralisAPI =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjE4ZTg5NjY3LTczMDMtNDY2ZS04MGQ1LTJjN2U0ZWRmYzgwZCIsIm9yZ0lkIjoiNDAwMDYzIiwidXNlcklkIjoiNDExMDc2IiwidHlwZUlkIjoiYTJiYWI0NDEtMDQyZC00Mjg0LTk4YzktNDRlMmY1Mjg1N2E0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjA5MjQ2MDQsImV4cCI6NDg3NjY4NDYwNH0._CMshA8FwdCv4AHavbgLa_ATz5Cf1t-y0mHn3NjJgn8";

  const { mutateAsync: addDocumentAsync } = useContractWrite(
    contract,
    "addDocument"
  );

  const { mutateAsync: signDocumentAsync } = useContractWrite(
    contract,
    "signDocument"
  );

  const getEmployer = async (): Promise<string | undefined> => {
    try {
      if (contract) {
        const employer = await contract.call("getEmployer");
        return employer;
      }
    } catch (error) {
      console.error("Error fetching employer address from contract: ", error);
      return undefined;
    }
  };

  const addDocument = async (
    employee: string,
    encodedDocumentContent: string,
    documentType: DocumentType
  ): Promise<void> => {
    try {
      const data = await addDocumentAsync({
        args: [employee, documentType, encodedDocumentContent],
      });
      console.log("Contract call success: ", data.receipt.blockHash);
    } catch (error) {
      console.error("Contract call failure: ", error);
    }
  };

  const signDocument = async (documentId: number): Promise<void> => {
    try {
      const data = await signDocumentAsync({
        args: [documentId],
      });
      console.log("Contract call success: ", data.receipt.blockHash);
    } catch (error) {
      console.error("Contract call failure: ", error);
    }
  };

  const getEmploymentDocuments = async (
    employee: string
  ): Promise<EmploymentDocument[] | undefined> => {
    try {
      if (contract) {
        const docs = await contract.call("getEmploymentDocuments", [employee]);
        return docs;
      }
    } catch (error) {
      console.error("Error fetching documents from contract: ", error);
      return undefined;
    }
  };

  const getAllEmploymentDocuments = async (): Promise<
    EmploymentDocument[] | undefined
  > => {
    try {
      if (contract) {
        const docs = await contract.call("getAllEmploymentDocuments");
        return docs;
      }
    } catch (error) {
      console.error("Error fetching all documents from contract: ", error);
      return undefined;
    }
  };

  const getEventsTxHash = async (): Promise<string[]> => {
    try {
      if (!Moralis.Core.isStarted) {
        await Moralis.start({
          apiKey: moralisAPI,
        });
      }

      const response = await Moralis.EvmApi.events.getContractEvents({
        address: contractAddress,
        chain: chain,
        topic: topic,
        abi: abi,
      });

      const txHashes: string[] = response
        .toJSON()
        .result.map((tx: any) => tx.transaction_hash);
      return txHashes;
    } catch (error) {
      console.error("Moralis error: ", error);
      return [];
    }
  };

  const getDecodedTx = async (hash: string) => {
    try {
      if (!Moralis.Core.isStarted) {
        await Moralis.start({
          apiKey: moralisAPI,
        });
      }

      const response = await Moralis.EvmApi.transaction.getTransactionVerbose({
        chain: chain,
        transactionHash: hash,
      });

      console.log(response);
    } catch (error) {
      console.error("Moralis error: ", error);
    }
  };

  const getLogsTxHash = async () => {
    const etherscan = await axios.get(
      `https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&address=${contractAddress}&apikey=GHGBY95CPGZVYSQZ7SHDVMPRXJA154NFMD`
    );
    let { result } = etherscan.data;
    console.log("Etherscan result: ", result);
  };

  return (
    <ContractContext.Provider
      value={{
        connect,
        address,
        contract,
        getEmployer,
        addDocument,
        signDocument,
        getEmploymentDocuments,
        getAllEmploymentDocuments,
        getEventsTxHash,
        getDecodedTx,
        getLogsTxHash,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = (): ContractContextProps => {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error(
      "useContractContext must be used within a ContractContextProvider"
    );
  }
  return context;
};

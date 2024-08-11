import { useActiveAccount } from "thirdweb/react";
import { contractABI } from "@/contract/contractABI";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { BigNumber, ethers, utils } from "ethers";
import { Account } from "thirdweb/wallets";

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
  sender: string;
  recipient: string;
  packageType: number;
  documentHash: string;
  employerSignature: string;
  employeeSignature: string;
  createdOn: number;
  lastModified: number;
  expiry: number;
  pId: number;
}

export interface TableData {
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail: string;
  sender: string;
  recipient: string;
  packageType: string;
  documentHash: string;
  employerSignature: string;
  employeeSignature: string;
  createdOn: number;
  lastModified: number;
  expiry: number;
  pId: number;
}

interface ContractContextProps {
  activeAccount: Account | undefined;
  packageDetail: TableData | undefined;
  setPackageDetail: Dispatch<SetStateAction<TableData | undefined>>;
  getEmployer: () => string;
  getDocumentAddedEvent: (
    docHash: string
  ) => Promise<{ employee: string; transactionHash: string } | null>;
  getDocumentSignedEvent: (
    index: number
  ) => Promise<{ transactionHash: string } | null>;
  getDocuments: () => Promise<EmploymentDocument[]>;
  addDocument: (
    employee: string,
    docType: number,
    encodedDocumentContent: string,
    signature: string,
    expiry: number,
    updateStatus: (status: boolean, txHash: string | null) => void
  ) => Promise<void>;
  signDocument: (
    index: number,
    signature: string,
    updateStatus: (status: boolean, txHash: string | null) => void
  ) => Promise<void>;
}

export const ContractContext = createContext<ContractContextProps | undefined>(
  undefined
);

export const ContractContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [packageDetail, setPackageDetail] = useState<TableData | undefined>(
    undefined
  );

  const activeAccount = useActiveAccount();

  const getEmployer = (): string => {
    const employer = "0x91f4407DD03C242b7D06F25AE20934629Ad805c4";
    return employer;
  };

  const getDocumentAddedEvent = async (
    docHash: string
  ): Promise<{ employee: string; transactionHash: string } | null> => {
    if (window?.ethereum && process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        contractABI,
        provider
      );
      const filter = contract.filters.DocumentAdded();
      const events = await contract.queryFilter(filter);

      const filteredEvent = events.find(
        (event) => event.args && event.args[3] === docHash
      );

      if (filteredEvent && filteredEvent.args) {
        return {
          employee: filteredEvent.args[0],
          transactionHash: filteredEvent.transactionHash,
        };
      }
    }
    return null;
  };

  const getDocumentSignedEvent = async (
    index: number
  ): Promise<{ transactionHash: string } | null> => {
    if (window?.ethereum && process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        contractABI,
        provider
      );
      const filter = contract.filters.DocumentSigned();
      const events = await contract.queryFilter(filter);

      const filteredIndex = BigNumber.from(index);

      const filteredEvent = events.find(
        (event) => event.args && BigNumber.from(event.args[0]).eq(filteredIndex)
      );

      if (filteredEvent && filteredEvent.args) {
        return {
          transactionHash: filteredEvent.transactionHash,
        };
      }
    }
    return null;
  };

  const getDocuments = async (): Promise<EmploymentDocument[]> => {
    if (window?.ethereum && process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        contractABI,
        provider
      );
      const rawDocuments = await contract.getDocuments();
      const documents: EmploymentDocument[] = rawDocuments.map(
        (item: any[], index: number) => ({
          sender: item[0],
          recipient: item[1],
          packageType: item[2],
          documentHash: item[3],
          employerSignature: item[4],
          employeeSignature: item[5],
          createdOn: item[6].toNumber(),
          lastModified: item[7].toNumber(),
          expiry: item[8].toNumber(),
          pId: index,
        })
      );
      return documents;
    }
    return [];
  };

  const addDocument = async (
    recipient: string,
    docType: number,
    docHash: string,
    signature: string,
    expiry: number,
    updateStatus: (status: boolean, txHash: string | null) => void
  ): Promise<void> => {
    try {
      if (window?.ethereum && process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          contractABI,
          provider
        );
        const signer = provider.getSigner();
        const contractWithSigner = contract.connect(signer);

        updateStatus(false, null);

        const tx = await contractWithSigner.addDocument(
          recipient,
          docType,
          docHash,
          signature,
          expiry
        );
        console.log("Transaction sent: ", tx.hash);
        updateStatus(false, tx.hash);
        const receipt = await tx.wait();
        console.log("Transaction successful: ", receipt.transactionHash);
        updateStatus(true, receipt.transactionHash);
        // console.log("Transaction confirmed: ", receipt);
        // return receipt;
      }
    } catch (error) {
      console.error("Transaction failed: ", error);
      updateStatus(false, "0x");
    }
  };

  const signDocument = async (
    index: number,
    signature: string,
    updateStatus: (status: boolean, txHash: string | null) => void
  ): Promise<void> => {
    try {
      if (window?.ethereum && process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          contractABI,
          provider
        );
        const signer = provider.getSigner();
        const contractWithSigner = contract.connect(signer);

        const debugContract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          contractABI,
          signer
        );

        try {
          const gasEstimate = await debugContract.estimateGas.signDocument(
            index,
            signature
          );
          console.log("Estimated gas: ", gasEstimate.toString());

          updateStatus(false, null);

          const tx = await debugContract.signDocument(index, signature, {
            gasLimit: gasEstimate,
          });
          console.log("Transaction sent: ", tx.hash);
          updateStatus(false, tx.hash);
          const receipt = await tx.wait();
          console.log("Transaction successful: ", receipt.transactionHash);
          updateStatus(true, receipt.transactionHash);
        } catch (error) {
          console.error("Transaction failed: ", error);
          updateStatus(false, "0x");
        }

        // const tx = await contractWithSigner.signDocument(index, signature);
        // console.log("Transaction sent: ", tx.hash);
        // const receipt = await tx.wait();
        // console.log("Transaction confirmed: ", receipt);
        // const receipt = "test";
        // return receipt;
      }
    } catch (error) {
      console.error(error);
      updateStatus(false, "0x");
    }
  };

  return (
    <ContractContext.Provider
      value={{
        activeAccount,
        packageDetail,
        setPackageDetail,
        getEmployer,
        getDocumentAddedEvent,
        getDocumentSignedEvent,
        getDocuments,
        addDocument,
        signDocument,
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

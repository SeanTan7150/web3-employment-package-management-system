// import {
//   useConnect,
//   useContract,
//   useContractWrite,
//   useDisconnect,
//   useConnectionStatus,
//   SmartContract,
// } from "@thirdweb-dev/react";
// import { useActiveAccount } from "thirdweb/react";
// import { contractABI } from "@/contract/contractABI";
// import { createContext, useContext } from "react";
// import { BaseContract, BigNumber } from "ethers";
// import { Account } from "thirdweb/wallets";

// export enum DocumentType {
//   Offer = 0,
//   Promotion = 1,
//   Resignation = 2,
//   Termination = 3,
//   ContractRenewal = 4,
//   SalaryIncrease = 5,
//   Bonus = 6,
//   Transfer = 7,
//   Warning = 8,
//   EmploymentVerification = 9,
//   JobDescription = 10,
//   TrainingCompletion = 11,
//   ProbationPeriodCompletion = 12,
//   LeaveApproval = 13,
//   Reference = 14,
//   Relocation = 15,
//   Retirement = 16,
//   EndOfContract = 17,
//   ChangeInEmploymentTerms = 18,
// }

// export interface EmploymentDocument {
//   id: BigNumber;
//   docType: number;
//   encodedDocumentContent: string;
//   timestamp: number;
//   employee: string;
//   signedByEmployee: boolean;
//   signedByEmployer: boolean;
// }

// interface ContractContextProps {
//   activeAccount: Account | undefined;
//   isLoggedIn: () => Promise<boolean>;
//   connect: any;
//   contract: any;
//   disconnect: any;
//   connectionStatus: string;
//   getEmployer: () => Promise<string | undefined>;
//   addDocument: (
//     employee: string,
//     encodedDocumentContent: string,
//     documentType: DocumentType,
//     signature: string
//   ) => Promise<void>;
//   signDocument: (documentIndex: number, signature: string) => Promise<void>;
//   getEmploymentDocuments: (
//     employee: string
//   ) => Promise<EmploymentDocument[] | undefined>;
//   getAllEmploymentDocuments: () => Promise<EmploymentDocument[] | undefined>;
//   getDocumentAddedEventTx: (
//     contract: SmartContract<BaseContract> | undefined
//   ) => Promise<string[]>;
// }

// export const ContractContext = createContext<ContractContextProps | undefined>(
//   undefined
// );

// export const ContractContextProvider: React.FC<{
//   children: React.ReactNode;
// }> = ({ children }) => {
//   const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
//   const { contract } = useContract(contractAddress, contractABI);
//   const activeAccount = useActiveAccount();
//   const connect = useConnect();
//   const disconnect = useDisconnect();
//   const connectionStatus = useConnectionStatus();

//   const isLoggedIn = async () => {
//     return await isLoggedIn();
//   };

//   const { mutateAsync: addDocumentAsync } = useContractWrite(
//     contract,
//     "addDocument"
//   );

//   const { mutateAsync: signDocumentAsync } = useContractWrite(
//     contract,
//     "signDocument"
//   );

//   const getEmployer = async (): Promise<string | undefined> => {
//     try {
//       if (contract) {
//         const employer = await contract.call("getEmployer");
//         return employer;
//       }
//     } catch (error) {
//       console.error("Error fetching employer address from contract: ", error);
//       return undefined;
//     }
//   };

//   const addDocument = async (
//     employee: string,
//     encodedDocumentContent: string,
//     documentType: DocumentType,
//     signature: string
//   ): Promise<void> => {
//     try {
//       const data = await addDocumentAsync({
//         args: [employee, documentType, encodedDocumentContent, signature],
//       });
//       console.log("Contract call success: ", data);
//     } catch (error) {
//       console.error("Contract call failure: ", error);
//     }
//   };

//   const signDocument = async (
//     documentId: number,
//     signature: string
//   ): Promise<void> => {
//     try {
//       const data = await signDocumentAsync({
//         args: [documentId],
//       });
//       console.log("Contract call success: ", data.receipt.blockHash);
//     } catch (error) {
//       console.error("Contract call failure: ", error);
//     }
//   };

//   const getEmploymentDocuments = async (
//     employee: string
//   ): Promise<EmploymentDocument[] | undefined> => {
//     try {
//       if (contract) {
//         const docs = await contract.call("getEmploymentDocuments", [employee]);
//         return docs;
//       }
//     } catch (error) {
//       console.error("Error fetching documents from contract: ", error);
//       return undefined;
//     }
//   };

//   const getAllEmploymentDocuments = async (): Promise<
//     EmploymentDocument[] | undefined
//   > => {
//     try {
//       if (contract) {
//         const docs = await contract.call("getAllEmploymentDocuments");
//         return docs;
//       }
//     } catch (error) {
//       console.error("Error fetching all documents from contract: ", error);
//       return undefined;
//     }
//   };

//   const getDocumentAddedEventTx = async (
//     contract: SmartContract<BaseContract> | undefined
//   ): Promise<string[]> => {
//     if (contract) {
//       const events = await contract.events.getEvents("DocumentAdded");
//       return events.map((event) => event.transaction.transactionHash);
//     }
//     return [];
//   };

//   return (
//     <ContractContext.Provider
//       value={{
//         connect,
//         disconnect,
//         connectionStatus,
//         activeAccount,
//         isLoggedIn,
//         contract,
//         getEmployer,
//         addDocument,
//         signDocument,
//         getEmploymentDocuments,
//         getAllEmploymentDocuments,
//         getDocumentAddedEventTx,
//       }}
//     >
//       {children}
//     </ContractContext.Provider>
//   );
// };

// export const useContractContext = (): ContractContextProps => {
//   const context = useContext(ContractContext);
//   if (context === undefined) {
//     throw new Error(
//       "useContractContext must be used within a ContractContextProvider"
//     );
//   }
//   return context;
// };

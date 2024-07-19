import {
  useAddress,
  useConnect,
  useContract,
  useContractWrite,
} from "@thirdweb-dev/react";
import { contractABI } from "@/contract/contractABI";
import { createContext, useContext } from "react";
import { ethers } from "ethers";

export interface User {
  encodedUserDetails: string;
  encodedWorkExperiences: string;
  registeredOn: number;
  isRegistered: boolean;
}

export interface Job {
  postedBy: string;
  encodedJobDetails: string;
  postedOn: number;
  isAvailable: boolean;
  applicants: string[];
}

export interface ParsedJob {
  job: Job;
  id: number;
}

interface ContractContextProps {
  address: string | undefined;
  connect: any;
  contract: any;
  getUser: (address: string) => Promise<User | undefined>;
  createUser: (encodedUserDetails: string) => Promise<void>;
  updateUserDetails: (encodedUserDetails: string) => Promise<void>;
  publishJob: (encodedJobDetails: string) => Promise<void>;
  getJobs: () => Promise<ParsedJob[] | undefined>;
}

export const ContractContext = createContext<ContractContextProps | undefined>(
  undefined
);

export const ContractContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { contract } = useContract(
    "0x8d3EFD5D94cFe031993d0dF73a46b0d6d20a81b0",
    contractABI
  );

  const { mutateAsync: createUserAsync } = useContractWrite(
    contract,
    "createUser"
  );

  const { mutateAsync: updateUserDetailsAsync } = useContractWrite(
    contract,
    "updateUserDetails"
  );

  const { mutateAsync: publishJobAsync } = useContractWrite(
    contract,
    "publishJob"
  );

  const address = useAddress();
  const connect = useConnect();

  const getUser = async (address: string): Promise<User | undefined> => {
    if (!ethers.utils.isAddress(address)) {
      return undefined;
    }

    try {
      const user = await contract?.call("getUser", [address]);
      console.log("User data fetched from contract: ", user);
      return user;
    } catch (error) {
      console.error("Error fetching user from contract: ", error);
      return undefined;
    }
  };

  const createUser = async (encodedUserDetails: string): Promise<void> => {
    try {
      const data = await createUserAsync({ args: [encodedUserDetails] });
      console.log("Contract call success: ", data);
    } catch (error) {
      console.error("Contract call failure: ", error);
    }
  };

  const updateUserDetails = async (
    encodedUserDetails: string
  ): Promise<void> => {
    try {
      const data = await updateUserDetailsAsync({ args: [encodedUserDetails] });
      console.log("Contract call success: ", data);
    } catch (error) {
      console.error("Contract call failure: ", error);
    }
  };

  const publishJob = async (encodedJobDetails: string): Promise<void> => {
    try {
      const data = await publishJobAsync({ args: [encodedJobDetails] });
      console.log("Contract call success: ", data);
    } catch (error) {
      console.error("Contract call failure: ", error);
    }
  };

  const getJobs = async (): Promise<ParsedJob[] | undefined> => {
    try {
      const jobs = await contract?.call("getJobs");
      console.log("Jobs data fetched from contract: ", jobs);

      const parsedJobs: ParsedJob[] = jobs.map((job: Job, i: number) => ({
        job: job,
        id: i,
      }));
      return parsedJobs;
    } catch (error) {
      console.error("Error fetching jobs from contract: ", error);
      return undefined;
    }
  };

  return (
    <ContractContext.Provider
      value={{
        connect,
        address,
        contract,
        getUser,
        createUser,
        updateUserDetails,
        publishJob,
        getJobs,
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

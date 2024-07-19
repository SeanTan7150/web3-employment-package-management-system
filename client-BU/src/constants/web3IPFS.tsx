"use client";

import axios from "axios";
import FormData from "form-data";
import { createContext, useContext, useState } from "react";

interface IPFSContextProps {
  uploadToIPFS: (file: File) => Promise<string | null>;
  IPFSUrl: string | null;
  isLoading: boolean;
}

export const IPFSContext = createContext<IPFSContextProps | undefined>(
  undefined
);

export const IPFSContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [IPFSUrl, setIPFSUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const projectAPI =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhOTlmNjBhZi05OGQ3LTRjZmQtOTRhMC02OWZjYzFhNzEzYjAiLCJlbWFpbCI6InhpdWhhd3RhbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZjJmMTg4ZmVmZDQwZDU4ZTc4NDUiLCJzY29wZWRLZXlTZWNyZXQiOiIwN2E4NDU4YmRjMjM2YjkzMTBhNWUwOGZmMDdlYWY2YmY3NjdmMTU0NTFiYmM5MDlhZmY4Zjg0MDU4NWYyZTBjIiwiaWF0IjoxNzE5ODk2NDk5fQ.Ql_phc5A1qpkx0A1FQab9cBXA-hBT5BWHF7xE-Ze-HM";

  const uploadToIPFS = async (file: File): Promise<string | null> => {
    setIsLoading(true);

    let data = new FormData();
    data.append("file", file);
    const metadata = JSON.stringify({ name: file.name });
    data.append("pinataMetadata", metadata);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data,
        {
          maxContentLength: Infinity,
          headers: {
            "Content-Type": `multipart/form-data; boundary=${data.getBoundary}`,
            Authorization: `Bearer ${projectAPI}`,
          },
        }
      );
      const uploadedHash = res.data.IpfsHash;
      return uploadedHash;
    } catch (error) {
      console.error("Error uploading file to IPFS", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IPFSContext.Provider value={{ uploadToIPFS, IPFSUrl, isLoading }}>
      {children}
    </IPFSContext.Provider>
  );
};

export const useIPFSContext = (): IPFSContextProps => {
  const context = useContext(IPFSContext);
  if (context === undefined) {
    throw new Error("useIPFSContext must be used within a IPFSContextProvider");
  }
  return context;
};

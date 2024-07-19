"use client";

import { useContractContext } from "@/context/contract";
import { useEffect, useState } from "react";

export default function Home() {
  const [employerAddress, setEmployerAddress] = useState<string | undefined>(
    undefined
  );

  const { contract, getEmployer, address } = useContractContext();

  const fetchEmployer = async () => {
    const data = await getEmployer();
    setEmployerAddress(data);
  };

  useEffect(() => {
    if (contract) {
      fetchEmployer();
    }
  }, [contract]);

  return (
    <>
      <div className={`mt-20 ${address ? "sm:ml-64" : null}`}>
        <div>{employerAddress}</div>
      </div>
    </>
  );
}

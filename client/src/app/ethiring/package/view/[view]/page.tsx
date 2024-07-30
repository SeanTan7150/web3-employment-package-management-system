"use client";

import { authedOnly } from "@/app/actions/auth";
import { Loader } from "@/components/loader/Loader";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Table } from "@/components/table/Table";
import {
  EmploymentDocument,
  TableData,
  useContractContext,
} from "@/context/contract";
import { packageMap } from "@/models/package";
import { User } from "@/models/user";
import { readUsers } from "@/services/service";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function View({ params }: { params: { view: string } }) {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthVerified, setIsAuthVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchJWT = async () => {
      const verified = await authedOnly();
      if (verified) {
        setIsAuthVerified(true);
      } else {
        router.push("/?status=403");
      }
      setIsAuthLoading(false);
    };
    fetchJWT();
  }, [router]);

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [isEmployer, setIsEmployer] = useState(false);

  const { getDocuments, getEmployer } = useContractContext();

  useEffect(() => {
    const fetchEmployees = async () => {
      const { users } = await readUsers();
      setEmployees(users);
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchAllEmploymentDocuments = async () => {
      try {
        let activeAccount = "";
        if (window?.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          activeAccount = await provider.getSigner().getAddress();
        }

        const documents: EmploymentDocument[] = await getDocuments();
        const newTableData: TableData[] = [];
        for (const doc of documents) {
          const sender = employees.find((emp) => emp.auth == doc.sender);
          const recipient = employees.find((emp) => emp.auth == doc.recipient);
          const newData: TableData = {
            senderName: `${sender ? sender.first_name : "0xunknown"} ${
              sender ? sender.last_name : "user"
            }`,
            senderEmail: sender ? sender.email : "0xunknown",
            recipientName: `${recipient ? recipient.first_name : "0xunknown"} ${
              recipient ? recipient.last_name : "user"
            }`,
            recipientEmail: recipient ? recipient.email : "0xunknown",
            sender: doc.sender,
            recipient: doc.recipient,
            packageType: packageMap[doc.packageType],
            documentHash: doc.documentHash,
            employerSignature: doc.employerSignature,
            employeeSignature: doc.employeeSignature,
            createdOn: doc.createdOn,
            lastModified: doc.lastModified,
            expiry: doc.expiry,
            pId: doc.pId,
          };
          newTableData.push(newData);
        }

        let filteredData: TableData[] = [];
        if (params.view === "inbox") {
          filteredData = newTableData.filter(
            (doc) => doc.recipient == activeAccount
          );
        } else if (params.view === "sent") {
          filteredData = newTableData.filter(
            (doc) => doc.sender == activeAccount
          );
        } else if (params.view === "completed") {
          filteredData = newTableData.filter(
            (doc) =>
              (doc.sender == activeAccount || doc.recipient == activeAccount) &&
              doc.employerSignature !== "0x" &&
              doc.employeeSignature !== "0x"
          );
        } else {
          filteredData = newTableData;
        }
        setTableData(filteredData);
      } catch (error) {
        console.error("Error fetching documents or events data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isAuthVerified) {
      fetchAllEmploymentDocuments();
    }
  }, [isAuthVerified, employees]);

  if (isLoading || isAuthLoading || !isAuthVerified) {
    return <Loader subtitle="Summoning your epic packages..." />;
  }

  return (
    <>
      <Sidebar />
      <div className="p-6">
        <div className={`mt-16 sm:ml-64`}>
          <Table data={tableData} view={params.view} />
        </div>
      </div>
    </>
  );
}

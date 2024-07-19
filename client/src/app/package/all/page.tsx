"use client";

import { EmploymentDocument, useContractContext } from "@/context/contract";
import { useEffect, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import Link from "next/link";
import { BigNumber } from "ethers";
import { readUser, User } from "@/app/api/users/service";
import { MdOutlineSearch } from "react-icons/md";

interface TableHeaderItemProps {
  title: string;
}

interface TableData {
  age: string;
  id: string;
  tx: string;
  name: string;
  email: string;
  auth: string;
  registered: string;
  package: string;
  signedByEmployee: boolean;
  signedByEmployer: boolean;
}

export default function All() {
  const [tableData, setTableData] = useState<TableData[] | undefined>(
    undefined
  );
  const [txHashes, setTxHashes] = useState<string[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);

  const { getEventsTxHash, address, contract, getAllEmploymentDocuments } =
    useContractContext();

  useEffect(() => {
    const fetchEventsTxHash = async () => {
      const data: string[] = await getEventsTxHash();
      setTxHashes(data);
    };

    fetchEventsTxHash();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await readUser();
      const employees = Object.values(response);
      setEmployees(employees[0]);
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchAllEmploymentDocuments = async () => {
      const data: EmploymentDocument[] | undefined =
        await getAllEmploymentDocuments();
      if (data) {
        const packageMap: { [key in number]: string } = {
          0: "Offer Letter",
          1: "Promotion Letter",
          2: "Resignation Letter",
        };

        const tempTableData: TableData[] = [];

        for (let i = 0; i < data.length; i++) {
          const doc = data[i];
          const employee = employees.find((emp) => emp.auth == doc.employee);
          if (employee) {
            const tabledata: TableData = {
              age: formatDistanceToNow(new Date(doc.timestamp * 1000)),
              id: (doc.id as BigNumber).toString(),
              tx: txHashes[i],
              name: `${employee.first_name} ${employee.last_name}`,
              email: employee.email,
              auth: employee.auth,
              registered: employee.registered.toString(),
              package: packageMap[doc.docType],
              signedByEmployee: doc.signedByEmployee,
              signedByEmployer: doc.signedByEmployer,
            };
            tempTableData.push(tabledata);
          }
        }
        setTableData(tempTableData);
      }
    };

    fetchAllEmploymentDocuments();
  }, [address, contract, txHashes, employees]);

  return (
    <>
      <div className={`mt-20 ${address ? "sm:ml-64" : null}`}>
        <div className="pb-4 bg-white">
          <label htmlFor="tableSearch" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <MdOutlineSearch className="text-gray-500" size={25} />
            </div>
            <input
              type="text"
              id="tableSearch"
              placeholder="Search for packages"
              autoComplete="off"
              className="pr-4 py-2.5 block pl-14 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="p-4 relative overflow-x-auto shadow-md sm:rounded-lg border">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 mb-8">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
              All Packages
              {tableData && (
                <p className="mt-1 text-sm font-normal text-gray-500">{`Latest 2 from a total of ${
                  tableData.length
                } transaction${tableData.length > 1 ? "s" : ""}`}</p>
              )}
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <TableHeaderItem title="Timestamp" />
                <TableHeaderItem title="Tx Hash" />
                <th scope="col" className="px-6 py-3">
                  Employee
                </th>
                <TableHeaderItem title="Package" />
                <TableHeaderItem title="Status" />
                <TableHeaderItem title="Actions" />
              </tr>
            </thead>
            {tableData ? (
              <tbody>
                {tableData.map((data) => (
                  <tr
                    key={data.tx}
                    className="bg-white border-b hover:bg-gray-100"
                  >
                    <td key="age" className="px-6 py-4">
                      {data.age}
                    </td>
                    <td key="id" className="px-6 py-4 text-center">
                      <Link
                        href={`https://sepolia.etherscan.io/tx/${data.tx}`}
                        className="font-medium text-blue-600 border border-white border-dashed p-1 hover:border-blue-500 hover:bg-sky-200 border-2 rounded-md"
                        target="_blank"
                      >
                        {data.tx && `${data.tx.slice(0, 13)}...`}
                      </Link>
                    </td>
                    <th
                      key="employee"
                      scope="row"
                      className="px-6 py-4 text-gray-900 whitespace-nowrap"
                    >
                      <div>
                        <div className="font-semibold">{data.name}</div>
                        <div className="font-normal text-gray-500">
                          {data.email}
                        </div>
                      </div>
                    </th>
                    <td key="package" className="px-6 py-4 text-center">
                      {data.package}
                    </td>
                    <td key="status" className="px-6 py-4 text-center">
                      {data.signedByEmployee && data.signedByEmployer ? (
                        <span className="px-2 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      ) : data.signedByEmployee && !data.signedByEmployer ? (
                        <span className="px-2 inline-flex leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Awaiting HR
                        </span>
                      ) : !data.signedByEmployee && data.signedByEmployer ? (
                        <span className="px-2 inline-flex leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Awaiting employee
                        </span>
                      ) : (
                        <span className="px-2 inline-flex leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Invalid
                        </span>
                      )}
                    </td>
                    <td key="action" className="px-6 py-4 text-center">
                      <Link
                        href={`/package/${data.auth}/${data.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                      {!data.signedByEmployer && (
                        <Link
                          href="/package"
                          className="font-medium text-blue-600 hover:underline ml-2"
                        >
                          Sign
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <th colSpan={6}>No record found</th>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

const TableHeaderItem = ({ title }: TableHeaderItemProps) => {
  return (
    <th scope="col" className="px-6 py-3 text-center">
      {title}
    </th>
  );
};

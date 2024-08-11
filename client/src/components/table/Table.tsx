import { TableData, useContractContext } from "@/context/contract";
import { useRouter } from "next/navigation";
import { MdOutlineSearch } from "react-icons/md";
import { truncate, formatDate } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";

interface TableProps {
  data: TableData[];
}

export const Table = ({ data }: TableProps) => {
  const { setPackageDetail } = useContractContext();
  const [tableData, setTableData] = useState<TableData[]>(data);
  const [originalData, setOriginalData] = useState<TableData[]>(data);
  const [title, setTitle] = useState("All");

  const router = useRouter();

  useEffect(() => {
    setOriginalData(data);
    setTableData(data);
  }, [data]);

  const handleView = (data: TableData) => {
    setPackageDetail(data);
    router.push(`/ethiring/package/details/${data.documentHash}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.senderName.toLowerCase().includes(value) ||
        item.recipientName.toLowerCase().includes(value) ||
        item.sender.toLowerCase().includes(value) ||
        item.recipient.toLowerCase().includes(value) ||
        item.packageType.toLowerCase().includes(value) ||
        item.documentHash.toLowerCase().includes(value)
    );
    setTableData(filtered);
  };

  const handleStatusSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value;

    if (selectedStatus == "All") {
      setTitle("All");
      setTableData(originalData);
    } else if (selectedStatus == "Completed") {
      setTitle("Completed");
      const filtered = data.filter(
        (item) =>
          item.employeeSignature != "0x" &&
          item.employerSignature != "0x" &&
          item.expiry > Math.floor(Date.now() / 1000)
      );
      setTableData(filtered);
    } else if (selectedStatus == "In progress") {
      setTitle("In Progress");
      const filtered = data.filter(
        (item) =>
          (item.employeeSignature != "0x" && item.employerSignature == "0x") ||
          (item.employeeSignature == "0x" &&
            item.employerSignature != "0x" &&
            item.expiry > Math.floor(Date.now() / 1000))
      );
      setTableData(filtered);
    } else if (selectedStatus == "Expired") {
      setTitle("Expired");
      const filtered = data.filter(
        (item) => item.expiry < Math.floor(Date.now() / 1000)
      );
      setTableData(filtered);
    }
  };

  const handleDownload = async (data: TableData) => {
    try {
      const fileURL = `https://${process.env.NEXT_PUBLIC_THIRDWEB_CLIENT}.ipfscdn.io/ipfs/${data.documentHash}`;
      if (data) {
        const response = await fetch(fileURL);

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${data.packageType}-${data.documentHash}.pdf`;
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Download error: ", error);
    }
  };

  return (
    <>
      <div className="pb-4 bg-white">
        <label htmlFor="tableSearch" className="sr-only">
          Search
        </label>
        <div className="flex items-center space-x-2 mt-1">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <MdOutlineSearch className="text-gray-500" size={25} />
            </div>
            <input
              type="text"
              id="tableSearch"
              placeholder="Search for packages"
              autoComplete="off"
              onChange={handleSearchChange}
              className="pr-4 py-2.5 block pl-14 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50"
            />
          </div>

          <div className="relative">
            <select
              id="statusSearch"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 cursor-pointer"
              onChange={handleStatusSearch}
              defaultValue="All"
            >
              <option>All</option>
              <option>Completed</option>
              <option>In progress</option>
              <option>Expired</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-4 relative overflow-x-auto shadow-md sm:rounded-lg border">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 mb-8">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
            {title} Packages
            {tableData && (
              <p className="mt-1 text-sm font-normal text-gray-500">{`Total of ${
                tableData.length
              } transaction${tableData.length > 1 ? "s" : ""}`}</p>
            )}
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Last Modified
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              <>
                {tableData.map((data) => (
                  <tr key={data.documentHash} className="hover:bg-gray-100">
                    <th
                      key="name"
                      scope="row"
                      className="px-6 py-4 text-gray-900 whitespace-nowrap cursor-pointer group"
                      onClick={() => {
                        handleView(data);
                      }}
                    >
                      <div>
                        <div className="font-semibold group-hover:text-blue-600 no-underline group-hover:underline">{`${
                          data.packageType
                        }: ${truncate(data.documentHash)}.pdf`}</div>
                        <div className="font-normal text-gray-500">{`To: ${data.recipientName}`}</div>
                      </div>
                    </th>
                    <td key="status" className="px-6 py-4 text-center">
                      {data.expiry < Math.floor(Date.now() / 1000) ? (
                        <span className="px-2 inline-flex leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Expired
                        </span>
                      ) : data.employeeSignature == "0x" ||
                        data.employerSignature == "0x" ? (
                        <span className="px-2 inline-flex leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          In progress
                        </span>
                      ) : (
                        <span className="px-2 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      )}
                    </td>
                    <td key="lastModified" className="px-6 py-4">
                      {formatDate(data.lastModified)}
                    </td>
                    <td>
                      {data.expiry < Math.floor(Date.now() / 1000) ? (
                        <button
                          type="button"
                          className="hover:text-gray-800 px-4 py-2 border border-gray-600"
                          onClick={() => {
                            handleView(data);
                          }}
                        >
                          View
                        </button>
                      ) : data.employerSignature != "0x" &&
                        data.employeeSignature != "0x" ? (
                        <button
                          type="button"
                          className="hover:text-gray-800 px-4 py-2 border border-gray-600"
                          onClick={() => {
                            handleDownload(data);
                          }}
                        >
                          Download
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <th className="text-center" colSpan={4}>
                  <div className="flex justify-center items-center my-8">
                    <div className="w-96 h-96">
                      <Image
                        src="/No-Data-Found-Illustration.jpg"
                        alt="No record found"
                        layout="responsive"
                        width={256}
                        height={256}
                      />
                    </div>
                  </div>
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

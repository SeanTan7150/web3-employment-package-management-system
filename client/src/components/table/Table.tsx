import { TableData, useContractContext } from "@/context/contract";
import { useRouter } from "next/navigation";
import { MdOutlineSearch } from "react-icons/md";
import { truncate, formatDate } from "@/utils/utils";
import { useState } from "react";

interface TableProps {
  data: TableData[];
  view: string;
}

export const Table = ({ data, view }: TableProps) => {
  const { getDocuments, setPackageDetail } = useContractContext();
  const [tableData, setTableData] = useState<TableData[]>(data);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleView = (data: TableData) => {
    setPackageDetail(data);
    router.push(`/ethiring/package/details/${data.documentHash}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
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

  return (
    <>
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
            onChange={handleSearchChange}
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
                  <tr
                    key={data.documentHash}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      handleView(data);
                    }}
                  >
                    <th
                      key="name"
                      scope="row"
                      className="px-6 py-4 text-gray-900 whitespace-nowrap"
                    >
                      <div>
                        <div className="font-semibold hover:text-blue-600">{`${
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
                        <button>View</button>
                      ) : data.employerSignature != "0x" &&
                        data.employeeSignature != "0x" ? (
                        <button>Download</button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <th colSpan={5}>No record found</th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

"use client";

import { authedOnly } from "@/app/actions/auth";
import { Loader } from "@/components/loader/Loader";
import { Sidebar } from "@/components/navigation/Sidebar";
import { useContractContext } from "@/context/contract";
import { User, UsersResponse } from "@/models/user";
import { activateUser, deactivateUser, readUsers } from "@/services/service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";

export default function Admin() {
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

  const [employees, setEmployees] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { getEmployer } = useContractContext();

  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString();
  };

  const fetchEmployees = async () => {
    const data: UsersResponse = await readUsers();
    const filtered = data.users.filter((user) => user.auth != getEmployer());
    setEmployees(filtered);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthVerified) {
      fetchEmployees();
    }
  }, [isAuthVerified]);

  const handleActivate = async (auth: string, name: string) => {
    setIsUpdating(true);
    const confirmed = confirm(`Activate ${name}?`);
    if (!confirmed) {
      setIsUpdating(false);
      return;
    }
    try {
      await activateUser(auth);
      await fetchEmployees();
    } catch (error) {
      console.error("Failed to activate: ", auth);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeactivate = async (auth: string, name: string) => {
    setIsUpdating(true);
    const confirmed = confirm(`Deactivate ${name}?`);
    if (!confirmed) {
      setIsUpdating(false);
      return;
    }
    try {
      await deactivateUser(auth);
      await fetchEmployees();
    } catch (error) {
      console.error("Failed to deactivate: ", auth);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading || isAuthLoading || !isAuthVerified) {
    return <Loader subtitle="Fetching employees data..." />;
  }

  return (
    <>
      <Sidebar />
      <div className="p-6">
        <div className="mt-20 sm:ml-64">
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
                placeholder="Search for employees"
                autoComplete="off"
                className="pr-4 py-2.5 block pl-14 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="p-4 relative overflow-x-auto shadow-md sm:rounded-lg border">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 mb-8">
              <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
                Manage Employees
                {employees && (
                  <p className="mt-1 text-sm font-normal text-gray-500">{`Total ${
                    employees.length
                  } account${employees.length > 1 ? "s" : ""}`}</p>
                )}
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Registered
                  </th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  <>
                    {employees.map((data) => (
                      <tr key={data.id} className="hover:bg-gray-100">
                        <th
                          key="name"
                          scope="row"
                          className="px-6 py-4 text-gray-900 whitespace-nowrap"
                        >
                          {`${data.first_name} ${data.last_name}`}
                        </th>
                        <td key="email" className="px-6 py-4">
                          {data.email}
                        </td>
                        <td key="registeredOn" className="px-6 py-4">
                          {formatDate(data.registered)}
                        </td>
                        <td className="text-center">
                          {data.is_activated ? (
                            <button
                              className="disabled:cursor-not-allowed text-red-600 hover:text-red-700"
                              onClick={() => {
                                handleDeactivate(
                                  data.auth,
                                  `${data.first_name} ${data.last_name}`
                                );
                              }}
                              disabled={isUpdating}
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              className="disabled:cursor-not-allowed text-blue-600 hover:text-blue-700"
                              onClick={() => {
                                handleActivate(
                                  data.auth,
                                  `${data.first_name} ${data.last_name}`
                                );
                              }}
                              disabled={isUpdating}
                            >
                              Activate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <th colSpan={5} className="text-center">
                      No record found
                    </th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

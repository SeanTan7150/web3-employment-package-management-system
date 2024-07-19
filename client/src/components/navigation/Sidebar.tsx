"use client";

import { readUser } from "@/app/api/users/service";
import { useContractContext } from "@/context/contract";
import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MdDashboard,
  MdDocumentScanner,
  MdPerson,
  MdDirectionsRun,
  MdMenuOpen,
  MdOutlineFolderCopy,
  MdOutlineFolderShared,
  MdHandyman,
} from "react-icons/md";

interface SidebarItemProps {
  path: string;
  activePath: string;
  children: React.ReactNode;
}

export const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isNavigationHidden, setIsNavigationHidden] = useState(false);
  const [activePath, setActivePath] = useState("/");

  const { address, contract } = useContractContext();
  const path = usePathname();
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const data = await readUser(address?.toString());
      if (data && Object.keys(data).length > 0) {
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      console.error("Failed to check registration: ", error);
      setIsRegistered(false);
    }

    if (path != "/" && path != "/register" && !isRegistered) {
      // router.push("/");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (address) {
      fetchUser();
    } else {
      setIsRegistered(false);
    }
    setIsLoading(false);
  }, [address]);

  useEffect(() => {
    setActivePath(path);
  }, [path]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              {isRegistered ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsNavigationHidden(!isNavigationHidden);
                  }}
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <MdMenuOpen className="w-6 h-6" />
                </button>
              ) : null}

              <Link href="/" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                  Ethiring
                </span>
              </Link>
            </div>

            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div className="flex items-center space-x-4">
                  {isLoading ? null : (
                    <>
                      {!isRegistered ? (
                        <Link href="/register">
                          <button
                            type="button"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          >
                            Sign up
                          </button>
                        </Link>
                      ) : null}
                    </>
                  )}

                  <ConnectWallet
                    theme={"dark"}
                    btnTitle={"Link Metamask"}
                    className="hover:bg-gray-700 hover:text-white"
                    detailsBtn={() => {
                      return (
                        <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300">
                          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                            {address
                              ? `${address.slice(0, 6)}...${address.slice(-4)}`
                              : ""}
                          </span>
                        </button>
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isRegistered ? (
        <>
          <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
              <ul className="space-y-2 font-medium">
                <SidebarItem path="/" activePath={activePath}>
                  <MdDashboard
                    className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900  ${
                      activePath == "/" ? "text-gray-900" : ""
                    }`}
                  />
                  <span className="ms-3">Dashboard</span>
                </SidebarItem>

                <SidebarItem path="/package/all" activePath={activePath}>
                  <MdDocumentScanner
                    className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900  ${
                      activePath == "/package/all" ? "text-gray-900" : ""
                    }`}
                  />
                  <span className="ms-3">Packages</span>
                </SidebarItem>

                <ul className="py-2 space-y-2">
                  <SidebarSubItem path="/package/all" activePath={activePath}>
                    <MdOutlineFolderCopy
                      className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900  ${
                        activePath == "/package/all" ? "text-gray-900" : ""
                      }`}
                    />
                    <span className="ms-3">All packages</span>
                  </SidebarSubItem>

                  <SidebarSubItem path="/package/my" activePath={activePath}>
                    <MdOutlineFolderShared
                      className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900  ${
                        activePath == "/package/my" ? "text-gray-900" : ""
                      }`}
                    />
                    <span className="ms-3">My packages</span>
                  </SidebarSubItem>

                  <SidebarSubItem path="/package/add" activePath={activePath}>
                    <MdHandyman
                      className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900  ${
                        activePath == "/package/add" ? "text-gray-900" : ""
                      }`}
                    />
                    <span className="ms-3">Craft package</span>
                  </SidebarSubItem>
                </ul>

                <SidebarItem path="/profile" activePath={activePath}>
                  <MdPerson
                    className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900  ${
                      activePath == "/profile" ? "text-gray-900" : ""
                    }`}
                  />
                  <span className="ms-3">Profile</span>
                </SidebarItem>

                <SidebarItem path="/logout" activePath={activePath}>
                  <MdDirectionsRun
                    className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900  ${
                      activePath == "/logout" ? "text-gray-900" : ""
                    }`}
                  />
                  <span className="ms-3">Logout</span>
                </SidebarItem>
              </ul>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
};

const SidebarItem = ({ path, children, activePath }: SidebarItemProps) => (
  <li>
    <Link
      href={path}
      passHref
      className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
        activePath === path ? "bg-gray-100" : ""
      }`}
    >
      {children}
    </Link>
  </li>
);

const SidebarSubItem = ({ path, children, activePath }: SidebarItemProps) => (
  <li>
    <Link
      href={path}
      passHref
      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 ${
        activePath === path ? "bg-gray-100" : ""
      }`}
    >
      {children}
    </Link>
  </li>
);

"use client";

import { ethers } from "ethers";
import { logout } from "../../app/actions/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MdDashboard,
  MdMoveToInbox,
  MdSend,
  MdCheckCircle,
  MdFolderCopy,
  MdCreateNewFolder,
  MdGroup,
} from "react-icons/md";
import { useContractContext } from "@/context/contract";

interface SidebarItemProps {
  path: string;
  activePath: string;
  children: React.ReactNode;
  handleClick?: () => void;
}

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigationHidden, setIsNavigationHidden] = useState(false);
  const [activePath, setActivePath] = useState("/ethiring");
  const [isEmployer, setIsEmployer] = useState(false);

  const path = usePathname();

  const { getEmployer } = useContractContext();

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchIsEmployer = async () => {
      if (window?.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const activeAccount = await provider.getSigner().getAddress();
        if (activeAccount == getEmployer()) {
          setIsEmployer(true);
        }
      }
    };

    setActivePath(path);
    fetchIsEmployer();
  }, [path]);

  return (
    <>
      {!isLoading ? (
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0">
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
            <ul className="space-y-2 font-medium">
              <SidebarItem path="/ethiring" activePath={activePath}>
                <MdDashboard
                  className={`flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600 ${
                    activePath === "/ethiring"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                />
                <span
                  className={`ms-3 ${
                    activePath === "/ethiring"
                      ? "text-blue-600"
                      : "text-gray-900"
                  }`}
                >
                  Dashboard
                </span>
              </SidebarItem>

              <li>
                <Link
                  href="/ethiring/package/view/inbox"
                  passHref
                  className={`flex items-center p-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 group ${
                    activePath.startsWith("/ethiring/package")
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-900"
                  }`}
                >
                  <MdFolderCopy
                    className={`flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600 ${
                      activePath.startsWith("/ethiring/package")
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span
                    className={`ms-3 ${
                      activePath.startsWith("/ethiring/package")
                        ? "text-blue-600"
                        : "text-gray-900"
                    }`}
                  >
                    Packages
                  </span>
                </Link>
              </li>

              <ul className="py-2 space-y-2">
                <SidebarSubItem
                  path="/ethiring/package/view/inbox"
                  activePath={activePath}
                >
                  <MdMoveToInbox
                    className={`flex-shrink-0 w-5 h-5 transition duration-75 hover:text-blue-600 group-hover:text-blue-600 ${
                      activePath === "/ethiring/package/view/inbox"
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span
                    className={`ms-3 ${
                      activePath === "/ethiring/package/view/inbox"
                        ? "text-blue-600"
                        : "text-gray-900"
                    }`}
                  >
                    Inbox
                  </span>
                </SidebarSubItem>

                <SidebarSubItem
                  path="/ethiring/package/view/sent"
                  activePath={activePath}
                >
                  <MdSend
                    className={`flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600 group-hover:text-blue-600 ${
                      activePath === "/ethiring/package/view/sent"
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span
                    className={`ms-3 ${
                      activePath === "/ethiring/package/view/sent"
                        ? "text-blue-600"
                        : "text-gray-900"
                    }`}
                  >
                    Sent
                  </span>
                </SidebarSubItem>

                <SidebarSubItem
                  path="/ethiring/package/view/completed"
                  activePath={activePath}
                >
                  <MdCheckCircle
                    className={`flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600 ${
                      activePath === "/ethiring/package/view/completed"
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span
                    className={`ms-3 ${
                      activePath === "/ethiring/package/view/completed"
                        ? "text-blue-600"
                        : "text-gray-900"
                    }`}
                  >
                    Completed
                  </span>
                </SidebarSubItem>

                <SidebarSubItem
                  path="/ethiring/package/add"
                  activePath={activePath}
                >
                  <MdCreateNewFolder
                    className={`flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600 ${
                      activePath === "/ethiring/package/add"
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span
                    className={`ms-3 ${
                      activePath === "/ethiring/package/view/add"
                        ? "text-blue-600"
                        : "text-gray-900"
                    }`}
                  >
                    Craft
                  </span>
                </SidebarSubItem>
              </ul>
              {isEmployer && (
                <SidebarItem path="/ethiring/admin" activePath={activePath}>
                  <MdGroup
                    className={`flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600 ${
                      activePath === "/ethiring/admin"
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span
                    className={`ms-3 ${
                      activePath === "/ethiring/admin"
                        ? "text-blue-600"
                        : "text-gray-900"
                    }`}
                  >
                    Admin
                  </span>
                </SidebarItem>
              )}
            </ul>
          </div>
        </aside>
      ) : null}
    </>
  );
};

const SidebarItem = ({
  path,
  children,
  activePath,
  handleClick,
}: SidebarItemProps) => (
  <li>
    <Link
      href={path}
      passHref
      className={`flex items-center p-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 group ${
        activePath === path ? "bg-blue-100" : ""
      }`}
      onClick={handleClick}
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
      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 hover:text-blue-600 ${
        activePath === path ? "bg-blue-100 text-blue-600" : ""
      }`}
    >
      {children}
    </Link>
  </li>
);

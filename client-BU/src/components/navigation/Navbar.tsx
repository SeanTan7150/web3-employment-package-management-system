"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { User, useContractContext } from "@/constants/web3EthContract";
import { metamaskWallet } from "@thirdweb-dev/react";

interface NavbarItemProps {
  path: string;
  activePath: string;
  children: React.ReactNode;
}

export const Navbar = () => {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [activePath, setActivePath] = useState(pathname);

  const { connect, address, contract, getUser } = useContractContext();

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const fetchUser = async () => {
    if (address !== undefined) {
      const data = await getUser(address);
      setUser(data);
      console.log("User fetched: ", data);
    }
  };

  useEffect(() => {
    if (contract) {
      console.log("Connected address: ", address);
      fetchUser();
    }
  }, [address, contract]);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <>
      <nav className="fixed w-full h-24 shadow-xl bg-transparent backdrop-filter backdrop-blur-md z-50">
        <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
          <Link href="/" className="hover:text-blue-500">
            Ethiring
          </Link>
          <div className="hidden sm:flex">
            <ul className="hidden sm:flex list-none">
              <NavbarItem path="/" activePath={activePath}>
                Home
              </NavbarItem>
              <NavbarItem path="/explore" activePath={activePath}>
                Explore
              </NavbarItem>
              <NavbarItem path="/publish" activePath={activePath}>
                Publish
              </NavbarItem>
              <NavbarItem path="/matrix" activePath={activePath}>
                Matrix
              </NavbarItem>
              <Link href="/about" className="hidden md:flex">
                <li
                  className={`ml-10 uppercase text-sm hover:text-blue-500 ${
                    pathname === "/about" ? "text-blue-500" : ""
                  }`}
                >
                  About
                </li>
              </Link>
            </ul>
          </div>
          {address ? (
            user && user.isRegistered ? (
              <div className="flex items-center">
                <Link href="/profile">
                  <span
                    className={`mr-2 uppercase text-sm hover:text-blue-500 ${
                      pathname === "/profile" ? "text-blue-500" : ""
                    }`}
                  >
                    {address.slice(0, 6)}...
                    {address.slice(-4)}
                  </span>
                </Link>
              </div>
            ) : (
              <Link
                href="/signup"
                className={`link ${pathname === "/signup" ? "active" : ""}`}
              >
                <span
                  className={`ml-10 uppercase text-sm hover:text-blue-500 ${
                    pathname === "/signup" ? "text-blue-500" : ""
                  }`}
                >
                  Signup
                </span>
              </Link>
            )
          ) : (
            <button
              onClick={async () => {
                const wallet = await connect(metamaskWallet());
                console.log("Connected to ", wallet);
              }}
              className="hover:text-blue-500"
            >
              Connect
            </button>
          )}
        </div>
        <div
          className={
            menuOpen
              ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div className="flex w-full items-center justify-end">
            <div onClick={handleNav} className="cursor-pointer">
              <AiOutlineClose size={25} />
            </div>
          </div>
          <div className="flex-col py-4">
            <ul>
              <Link href="/">
                <li
                  onClick={() => setMenuOpen(false)}
                  className="py-4 cursor-pointer"
                >
                  Home
                </li>
              </Link>
              <Link href="/explore">
                <li
                  onClick={() => setMenuOpen(false)}
                  className="py-4 cursor-pointer"
                >
                  Explore
                </li>
              </Link>
              <Link href="/publish">
                <li
                  onClick={() => setMenuOpen(false)}
                  className="py-4 cursor-pointer"
                >
                  Publish
                </li>
              </Link>
              <Link href="/matrix">
                <li
                  onClick={() => setMenuOpen(false)}
                  className="py-4 cursor-pointer"
                >
                  Matrix
                </li>
              </Link>

              {user && user.isRegistered ? (
                <Link href="/profile">
                  <li
                    onClick={() => setMenuOpen(false)}
                    className="py-4 cursor-pointer"
                  >
                    Profile
                  </li>
                </Link>
              ) : (
                <Link href="/signup">
                  <li
                    onClick={() => setMenuOpen(false)}
                    className="py-4 cursor-pointer"
                  >
                    Signup
                  </li>
                </Link>
              )}

              <Link href="/about">
                <li
                  onClick={() => setMenuOpen(false)}
                  className="py-4 cursor-pointer"
                >
                  About
                </li>
              </Link>
            </ul>
          </div>
          <div className="flex flex-row justify-around pt-5 items-center">
            <div>Metamask</div>
          </div>
        </div>
      </nav>
    </>
  );
};

const NavbarItem = ({ path, activePath, children }: NavbarItemProps) => (
  <Link href={path}>
    <li
      className={`ml-10 uppercase text-sm hover:text-blue-500 ${
        activePath === path ? "text-blue-500" : ""
      }`}
    >
      {children}
    </li>
  </Link>
);

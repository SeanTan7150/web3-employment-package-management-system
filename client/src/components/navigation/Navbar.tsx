"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useContractContext } from "@/context/contract";
import { metamaskWallet } from "@thirdweb-dev/react";

interface NavbarItemProps {
  path: string;
  activePath: string;
  children: React.ReactNode;
}

export const Navbar = () => {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState(pathname);

  const { connect, address, contract } = useContractContext();

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

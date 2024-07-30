"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ConnectButton,
  lightTheme,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import { client } from "@/lib/client";
import { createWallet, Wallet, WalletId } from "thirdweb/wallets";
import { useContractContext } from "@/context/contract";
import { MdWavingHand } from "react-icons/md";
import { authedOnly, logout } from "@/app/actions/auth";
import { redirect, useRouter } from "next/navigation";
import useMetaMaskAccountListener from "@/hook/AccountChangedListener";

export const Navbar = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const wallets = [createWallet("io.metamask")];
  const { activeAccount } = useContractContext();
  const { disconnect } = useDisconnect();
  const wallet: Wallet<WalletId> | undefined = useActiveWallet();

  const handleDisconnect = async () => {
    setIsLoading(true);
    const confirmed = confirm("Confirm logout?");
    if (!confirmed) {
      setIsLoading(false);
      return;
    }

    if (wallet) {
      await logout();
      disconnect(wallet);
      setIsLoading(false);
      router.push("/");
    } else {
      console.log("Wallet not found");
    }
  };

  const handleAccountChanged = async () => {
    if (wallet) {
      console.log("Account changed. Logging out...");
      alert("Account changed. Logging out...");
      await logout();
      disconnect(wallet);
      router.push("/");
    }
  };

  useMetaMaskAccountListener(handleAccountChanged);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <Link href="/ethiring" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                  Ethiring
                </span>
              </Link>
            </div>

            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div className="flex items-center space-x-4">
                  {!activeAccount ? (
                    <ConnectButton
                      client={client}
                      wallets={wallets}
                      theme={lightTheme({
                        colors: {
                          primaryButtonBg: "#ffffff",
                          primaryButtonText: "#000000",
                        },
                      })}
                      connectButton={{
                        className: "connectButton",
                        label: "Connect",
                      }}
                      connectModal={{
                        title: "Sign in to Ethiring",
                        titleIcon: "",
                        showThirdwebBranding: false,
                        size: "compact",
                        welcomeScreen: {
                          title: "Your gateway to fair employment",
                          subtitle: "Sign in to get started",
                        },
                        termsOfServiceUrl: "#",
                        privacyPolicyUrl: "#",
                      }}
                      detailsButton={{ className: "detailsButton" }}
                      showAllWallets={false}
                    />
                  ) : (
                    <button
                      onClick={handleDisconnect}
                      className="group flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    >
                      <span>{!isLoading ? "Disconnect" : "Disconnecting"}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

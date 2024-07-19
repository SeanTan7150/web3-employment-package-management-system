"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import {
  metamaskWallet,
  ThirdwebProvider,
  useContract,
} from "@thirdweb-dev/react";
import {
  ContractContextProvider,
  useContractContext,
} from "@/context/contract";
import { Sidebar } from "@/components/navigation/Sidebar";
import { usePathname, useSearchParams } from "next/navigation";
import { readUser } from "./api/users/service";
import { PackageFormContextProvider as OfferLetterPackageFormContextProvider } from "@/context/offer/packageForm";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { PackageFormContextProvider } from "@/context/promotion/packageForm";

const inter = Inter({ subsets: ["latin"] });

interface ToastItemProps {
  message: string;
  show: boolean;
  onClose: () => void;
  status: string | null;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const path = usePathname();
  const searchParams = useSearchParams();

  const isNavigationHidden = path === "/register";

  const status = searchParams.get("status");

  const handleClose = () => {
    setShowToast(false);
  };

  useEffect(() => {
    switch (status) {
      case "201":
        setToastMessage("Package crafted successfully!");
        setShowToast(true);
        break;
      case "202":
        setToastMessage("Package signed successfully!");
        setShowToast(true);
        break;
      case "403":
        setToastMessage(
          "Oops! Looks like you don't have the magic key for that page."
        );
        setShowToast(true);
        break;
      default:
        setShowToast(false);
    }
  }, [status]);

  return (
    <ThirdwebProvider
      activeChain="sepolia"
      clientId="afc1299eed27c91d590634fa178bf6e2"
      supportedWallets={[metamaskWallet({ recommended: true })]}
    >
      <ContractContextProvider>
        <OfferLetterPackageFormContextProvider>
          <PackageFormContextProvider>
            <html lang="en">
              <head>
                <title>Ethiring</title>
                <meta
                  name="description"
                  content="Employment package manager web 3.0"
                />
              </head>
              <body className={inter.className}>
                {!isNavigationHidden ? (
                  <>
                    <Sidebar />
                    <main className="p-4">
                      {children}
                      <ToastItem
                        message={toastMessage}
                        show={showToast}
                        onClose={handleClose}
                        status={status}
                      />
                    </main>
                  </>
                ) : (
                  <main>{children}</main>
                )}
              </body>
            </html>
          </PackageFormContextProvider>
        </OfferLetterPackageFormContextProvider>
      </ContractContextProvider>
    </ThirdwebProvider>
  );
}

const ToastItem = ({ message, show, onClose, status }: ToastItemProps) => {
  if (!show) return null;

  let color =
    "border-teal-200 text-teal-800 bg-teal-100 hover:bg-teal-800 hover:text-teal-100";

  if (status && status.startsWith("4")) {
    color =
      "border-yellow-200 text-yellow-800 bg-yellow-100 hover:bg-yellow-800 hover:text-yellow-100";
  }

  return (
    <div
      className={`text-sm flex items-center fixed bottom-4 right-4 p-4 border ${color} rounded shadow-lg transition-transform transform`}
    >
      {message}

      <button type="button" className="ml-4" onClick={onClose}>
        <MdClose size={20} />
      </button>
    </div>
  );
};

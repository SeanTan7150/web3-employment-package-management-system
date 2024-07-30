"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { ThirdwebProvider as ThirdwebProviderDev } from "@thirdweb-dev/react";
import { ContractContextProvider } from "@/context/contract";
import { usePathname } from "next/navigation";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";

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
  // const searchParams = useSearchParams();

  const isNavigationHidden = path === "/register";

  const handleClose = () => {
    setShowToast(false);
  };

  // useEffect(() => {
  //   const status = searchParams.get("status");

  //   switch (status) {
  //     case "201":
  //       setToastMessage("Package crafted successfully!");
  //       setShowToast(true);
  //       break;
  //     case "202":
  //       setToastMessage("Package signed successfully!");
  //       setShowToast(true);
  //       break;
  //     case "403":
  //       setToastMessage(
  //         "Oops! Looks like you don't have the magic key for that page."
  //       );
  //       setShowToast(true);
  //       break;
  //     default:
  //       setShowToast(false);
  //   }
  // }, [status]);

  return (
    <ThirdwebProviderDev
      activeChain="sepolia"
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT}
    >
      <ThirdwebProvider>
        <ContractContextProvider>
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
                  <Navbar />
                  <main>
                    {children}
                    {/* <ToastItem
                      message={toastMessage}
                      show={showToast}
                      onClose={handleClose}
                      status={status}
                    /> */}
                  </main>
                </>
              ) : (
                <main>{children}</main>
              )}
            </body>
          </html>
        </ContractContextProvider>
      </ThirdwebProvider>
    </ThirdwebProviderDev>
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

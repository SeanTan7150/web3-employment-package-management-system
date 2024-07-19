"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ContractContextProvider } from "@/constants/web3EthContract";
import { IPFSContextProvider } from "@/constants/web3IPFS";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThirdwebProvider
        activeChain="sepolia"
        clientId="afc1299eed27c91d590634fa178bf6e2"
      >
        <ContractContextProvider>
          <IPFSContextProvider>
            <html lang="en">
              <head>
                <title>Ethiring</title>
                <meta name="description" content="Job hiring web 3.0" />
              </head>
              <body className={inter.className}>
                <Navbar />
                <main className="pt-28">{children}</main>
              </body>
            </html>
          </IPFSContextProvider>
        </ContractContextProvider>
      </ThirdwebProvider>
    </>
  );
}

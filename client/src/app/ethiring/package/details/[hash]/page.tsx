"use client";

import { authedOnly } from "@/app/actions/auth";
import { Sidebar } from "@/components/navigation/Sidebar";
import { useContractContext } from "@/context/contract";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatDate, showPDFInIframe, truncate } from "@/utils/utils";
import {
  MdError,
  MdOutlineFileDownload,
  MdOutlineVerifiedUser,
} from "react-icons/md";
import Link from "next/link";
import { Loader } from "@/components/loader/Loader";

export default function ViewDetails({ params }: { params: { hash: string } }) {
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

  const [isLoading, setIsLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState(0);
  const [txHash, setTxHash] = useState("");
  const [verified, setVerified] = useState(true);
  const [copied, setCopied] = useState(false);
  const { getEmployer, signDocument, getDocumentAddedEvent, packageDetail } =
    useContractContext();
  const [loggedInUser, setLoggedInUser] = useState<string | undefined>(
    undefined
  );
  const [tempTx, setTempTx] = useState<string | null>(null);

  const handleSign = async (docHash: string) => {
    if (!packageDetail) {
      return alert("Error, please try again");
    }

    const confirmed = confirm("Confirm proceed signing the document?");
    if (confirmed) {
      setLoadingStatus(1);
      let signature = "";
      try {
        const message = `Please sign to confirm the upload of the document with CID: ${docHash}`;
        if (window?.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          signature = await provider.getSigner().signMessage(message);
          console.log("Signature: ", signature);
        }
      } catch (error) {
        console.error("Error during signature: ", error);
      }

      try {
        if (signature == "") {
          alert("Invalid signature");
          return;
        }
        setLoadingStatus(2);
        signDocument(
          packageDetail.pId,
          signature,
          (status: boolean, txHash: string | null) => {
            if (!status && !txHash) {
              setLoadingStatus(2);
            } else if (!status && txHash) {
              setTempTx(txHash);
              setLoadingStatus(3);
              console.log("Processing tx: ", txHash);
            } else {
              setTempTx(txHash);
              setLoadingStatus(4);
              console.log("Confirmed tx: ", txHash);
              console.log("Document signed at smart contract");
            }
          }
        );
      } catch (error) {
        console.error("Error during smart contract interaction: ", error);
      } finally {
        setLoadingStatus(0);
      }
    }
  };

  const toggleModal = async () => {
    await showPDFInIframe(
      `https://${process.env.NEXT_PUBLIC_THIRDWEB_CLIENT}.ipfscdn.io/ipfs/${params.hash}`
    );
  };

  const handleDownload = async () => {
    try {
      const fileURL = `https://${process.env.NEXT_PUBLIC_THIRDWEB_CLIENT}.ipfscdn.io/ipfs/${params.hash}`;
      if (packageDetail) {
        const response = await fetch(fileURL);

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${packageDetail.packageType}-${packageDetail.packageType}.pdf`;
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Download error: ", error);
    }
  };

  useEffect(() => {
    const fetchActiveAccount = async () => {
      if (window?.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const activeAccount = await provider.getSigner().getAddress();
        setLoggedInUser(activeAccount);
      }
    };
    if (isAuthVerified) {
      fetchActiveAccount();
    }
  }, [isAuthVerified]);

  useEffect(() => {
    if (isAuthVerified) {
      // only employer or target employee can view
      const checkAuthorization = async () => {
        const message = `Please sign to confirm the upload of the document with CID: ${params.hash}`;
        const result = await getDocumentAddedEvent(params.hash);
        if (result && packageDetail) {
          const { transactionHash } = result;
          if (window?.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const activeAccount = await provider.getSigner().getAddress();

            if (
              activeAccount != packageDetail.sender &&
              activeAccount != packageDetail.recipient
            ) {
              router.push("/ethiring/package/all");
            }

            const employerAddr = ethers.utils.verifyMessage(
              message,
              packageDetail.employerSignature
            );
            const employeeAddr = ethers.utils.verifyMessage(
              message,
              packageDetail.employeeSignature
            );

            if (
              employerAddr != getEmployer() &&
              packageDetail.employerSignature != "0x"
            ) {
              setVerified(false);
            }

            if (
              employeeAddr != packageDetail.recipient &&
              packageDetail.employeeSignature != "0x"
            ) {
              setVerified(false);
            }
            setTxHash(transactionHash);
          }
        }
      };
      checkAuthorization();
      setIsLoading(false);
    }
  }, [isAuthVerified]);

  if (isLoading || isAuthLoading || !isAuthVerified || !packageDetail) {
    return <Loader subtitle="Bringing the magic to your screen..." />;
  }

  if (loadingStatus == 1) {
    return <Loader subtitle="Securing your autograph..." />;
  }

  if (loadingStatus == 2) {
    return <Loader subtitle="Awaiting your magic touch..." />;
  }

  if (loadingStatus == 3 && tempTx) {
    return (
      <Loader subtitle="Prepping your digital awesomeness..." tx={tempTx} />
    );
  }

  if (loadingStatus == 4 && tempTx) {
    router.push("/ethiring/package/view/completed");
    return <Loader subtitle="Hold tight, greatness incoming..." tx={tempTx} />;
  }

  return (
    <>
      <Sidebar />
      <div className="p-6">
        <div className="mt-16 sm:ml-64">
          <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
            <div className="p-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
                  {`${packageDetail.packageType}-${truncate(
                    packageDetail.documentHash
                  )}.pdf`}
                  {verified ? (
                    <span className="ml-2 text-green-600 text-sm flex items-center">
                      <MdOutlineVerifiedUser size={20} />
                      <span className="ml-1">Verified</span>
                    </span>
                  ) : (
                    <span className="ml-2 text-red-600 text-sm flex items-center">
                      <MdError size={20} />
                      <span className="ml-1">Fraud package detected</span>
                    </span>
                  )}
                </h1>

                <p className="text-gray-600 mt-2">{`From: ${packageDetail.senderName}`}</p>
                <p className="text-gray-600 mt-2">{`To: ${packageDetail.recipientName}`}</p>
                <p className="text-gray-600 mt-2">{`Package Type: ${packageDetail.packageType}`}</p>
                <p className="text-gray-600 mt-2">{`Created On: ${formatDate(
                  packageDetail.createdOn
                )}`}</p>
                <p className="text-gray-600 mt-2">{`Status: ${
                  packageDetail.employeeSignature == "0x"
                    ? "Awaiting employee signature"
                    : packageDetail.employerSignature == "0x"
                    ? "Awaiting HR signature"
                    : "Complete"
                }`}</p>
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={toggleModal}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-lg hover:bg-blue-700"
                  >
                    View
                  </button>

                  {(loggedInUser == getEmployer() &&
                    packageDetail.employerSignature == "0x") ||
                  (loggedInUser != getEmployer() &&
                    packageDetail.employeeSignature == "0x") ? (
                    <button
                      type="button"
                      onClick={() => {
                        handleSign(params.hash);
                      }}
                      className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-700"
                    >
                      Sign
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Package Details
              </h2>
              <ol className="relative border-s border-gray-200 p-6 ml-2">
                <li className="mb-10 ms-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white"></span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                    {`Added and Deployed ${packageDetail.packageType}`}
                  </h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400">{`Executed on ${formatDate(
                    packageDetail.createdOn
                  )}`}</time>
                  <p className="mb-4 text-base font-normal text-gray-500">
                    {`Added by: ${packageDetail.senderName}`}
                    <br />
                    Tx Hash:{" "}
                    <Link href={`https://sepolia.etherscan.io/tx/${txHash}`}>
                      {txHash}
                    </Link>
                  </p>
                </li>
                {packageDetail.employerSignature != "0x" &&
                packageDetail.employeeSignature != "0x" ? (
                  <>
                    <li className="mb-10 ms-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white"></span>
                      <h3 className="mb-1 text-lg font-semibold text-gray-900">
                        {`${packageDetail.packageType} Signed`}
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400">{`Executed on ${formatDate(
                        packageDetail.lastModified
                      )}`}</time>
                      <p className="mb-4 text-base font-normal text-gray-500">
                        {`Signed by: ${packageDetail.recipientName}`}
                        <br />
                        Tx Hash:{" "}
                        <Link
                          href={`https://sepolia.etherscan.io/tx/${txHash}`}
                        >
                          {txHash}
                        </Link>
                      </p>
                    </li>
                    <li className="ms-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white"></span>
                      <h3 className="mb-1 text-lg font-semibold text-gray-900">
                        {`Verification on ${packageDetail.packageType} Completed`}
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                        Verified moments ago
                      </time>
                      <p className="mb-4 text-base font-normal text-gray-500">
                        Download at your fingertips
                      </p>
                      <button
                        type="button"
                        onClick={handleDownload}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700"
                      >
                        <MdOutlineFileDownload size={20} />
                        <span className="ml-2">Download PDF</span>
                      </button>
                    </li>
                  </>
                ) : null}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

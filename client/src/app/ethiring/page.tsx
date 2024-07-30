"use client";

import { authedOnly } from "@/app/actions/auth";
import {
  readUserByAddress,
  updateUserProfileImage,
  uploadImageToServer,
} from "@/services/service";
import { Sidebar } from "@/components/navigation/Sidebar";
import { EmploymentDocument, useContractContext } from "@/context/contract";
import { UserResponse } from "@/models/user";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MdAddBox,
  MdBarChart,
  MdContentCopy,
  MdMail,
  MdVerifiedUser,
  MdViewInAr,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/loader/Loader";
import { ethers } from "ethers";
import { Pie } from "react-chartjs-2";
import {
  calculateDaysAgo,
  generatePieChartData,
  getRecentActivities,
  truncate,
} from "@/utils/utils";
import { packageMap } from "@/models/package";

export default function Dashboard() {
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

  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isEmployer, setIsEmployer] = useState(false);

  const [totalSent, setTotalSent] = useState(0);
  const [totalSentLoading, setTotalSentLoading] = useState(true);
  const [totalSigned, setTotalSigned] = useState(0);
  const [totalSignedLoading, setTotalSignedLoading] = useState(true);
  const [totalPending, setTotalPending] = useState(0);
  const [totalPendingLoading, setTotalPendingLoading] = useState(true);

  const [recentActivitiesData, setRecentActivitiesData] = useState<
    EmploymentDocument[]
  >([]);
  const [recentActivitiesLoading, setRecentActivitiesLoading] = useState(true);

  const [pieChartData, setPieChartData] = useState<any>(null);
  const [pieChartLoading, setPieChartLoading] = useState(true);

  const { activeAccount, getDocuments, getEmployer } = useContractContext();

  const fetchProfile = async () => {
    if (activeAccount) {
      const { fetched, user }: UserResponse = await readUserByAddress(
        activeAccount.address
      );

      if (fetched) {
        setUserEmail(user.email);
        setUserFirstName(user.first_name);
        setUserLastName(user.last_name);
        setUserProfileImage(user.profile_image);
      }
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    const fetchPackagesCount = async () => {
      const documents: EmploymentDocument[] = await getDocuments();
      if (window?.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const activeAccount = await provider.getSigner().getAddress();
        if (activeAccount.toLowerCase() === getEmployer().toLowerCase()) {
          setIsEmployer(true);
        }
        // Sent Packages
        const sent = documents.filter(
          (doc) => doc.sender == activeAccount
        ).length;

        setTotalSent(sent);
        setTotalSentLoading(false);

        // Signed Packages
        const signed = documents.filter(
          (doc) =>
            doc.recipient === activeAccount &&
            (isEmployer
              ? doc.employerSignature != "0x"
              : doc.employeeSignature != "0x")
        ).length;

        setTotalSigned(signed);
        setTotalSignedLoading(false);

        // Pending Signatures
        const pending = documents.filter(
          (doc) =>
            doc.recipient === activeAccount &&
            (isEmployer
              ? doc.employerSignature == "0x"
              : doc.employeeSignature == "0x")
        ).length;

        setTotalPending(pending);
        setTotalPendingLoading(false);

        // Recent Activities
        const recentActivities = getRecentActivities(documents, activeAccount);
        setRecentActivitiesData(recentActivities);
        setRecentActivitiesLoading(false);

        // Pie Chart
        const data = generatePieChartData(documents, activeAccount);
        setPieChartData(data);
        setPieChartLoading(false);
      }
    };

    if (isAuthVerified) {
      fetchProfile();
      fetchPackagesCount();
    }
  }, [isAuthVerified]);

  const handleCopyAddress = () => {
    if (activeAccount) {
      navigator.clipboard.writeText(activeAccount.address).then(
        () => {
          alert("Address copied");
        },
        (err) => {
          console.error("Failed to copy address: ", err);
        }
      );
    }
  };

  //Profile image config
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        // setUserProfileImage(reader.result as string);
        handleUpdateProfileImage(reader.result as string, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateProfileImage(reader.result as string, file.name);
        // setUserProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfileImage = async (
    base64Image: string,
    filename: string
  ) => {
    if (!activeAccount) {
      alert("Error: Invalid account");
      return;
    }

    const confirmed = confirm("Proceed to update profile image?");
    if (!confirmed) {
      return;
    }

    try {
      const uploadedFilename = await uploadImageToServer(base64Image);

      if (uploadedFilename) {
        await updateUserProfileImage(activeAccount.address, uploadedFilename);
        await fetchProfile();
      }
    } catch (error) {
      console.error("Failed to upload image: ", error);
    }
  };

  if (isPageLoading || isAuthLoading || !isAuthVerified) {
    return <Loader subtitle="Getting your cool stuff ready..." />;
  }

  return (
    <>
      <Sidebar />
      <div className="p-6">
        <div className="mt-16 sm:ml-64">
          <div className="flex flex-wrap gap-4">
            <div className="flex-none w-full md:w-2/4 lg:w-2/4 p-4 bg-white border border-gray-300 rounded-lg shadow sm:p-8 h-full">
              <div className="flex items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-6 rtl:space-x-reverse">
                <div
                  className="relative"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <label htmlFor="profileImageInput" className="cursor-pointer">
                    <Image
                      src={
                        userProfileImage
                          ? `/profile/${userProfileImage}`
                          : `/New-User-Profile-Image.png`
                      }
                      alt="profile pic"
                      width={100}
                      height={100}
                      className="rounded-full shadow-lg border border-gray-100"
                    />
                    <input
                      id="profileImageInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>

                  <span className="bottom-0 left-[70px] absolute  w-5 h-5 bg-green-400 border-2 border-white rounded-full"></span>
                </div>

                <div>
                  <ul className="ml-6">
                    <li className="flex items-center space-x-2 font-semibold text-lg uppercase">
                      <span className="mr-2 text-gray-400">
                        <MdVerifiedUser size={20} />
                      </span>
                      <>{`${userFirstName} ${userLastName}`}</>
                    </li>
                    <li className="flex items-center font-medium text-base">
                      <span className="mr-2 text-gray-400">
                        <MdViewInAr size={20} />
                      </span>
                      {activeAccount ? (
                        <>
                          <Link
                            href={`https://sepolia.etherscan.io/address/${activeAccount?.address}`}
                            className="text-blue-600 hover:text-blue-600"
                          >
                            {`${activeAccount.address.slice(
                              0,
                              10
                            )}...${activeAccount.address.slice(-8)}`}
                          </Link>
                          <button
                            className="ml-2 text-gray-500 hover:text-blue-600"
                            onClick={handleCopyAddress}
                          >
                            <MdContentCopy size={20} />
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-500">
                          address not found...
                        </span>
                      )}
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-gray-400">
                        <MdMail size={20} />
                      </span>
                      <>{userEmail}</>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full md:w-2/5 lg:w-2/5 p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between hover:bg-gray-100">
              <Link href="/ethiring/package/view/sent">
                <div className="mt-4">
                  <MdBarChart size={40} className="mb-2 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-600">
                    Packages Sent
                  </h3>
                  <div className="text-2xl font-semibold">
                    {totalSentLoading ? "Loading..." : totalSent}
                  </div>
                </div>
              </Link>
            </div>

            <div className="flex-1 w-full md:w-2/5 lg:w-2/5 p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between hover:bg-gray-100">
              <Link href="/ethiring/package/view/completed">
                <div className="mt-4">
                  <MdBarChart size={40} className="mb-2 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-600">
                    Packages Signed
                  </h3>
                  <div className="text-2xl font-semibold">
                    {totalSignedLoading ? "Loading..." : totalSigned}
                  </div>
                </div>
              </Link>
            </div>

            <div className="flex-1 w-full md:w-2/5 lg:w-2/5 p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between hover:bg-gray-100">
              <Link href="/ethiring/package/view/inbox">
                <div className="mt-4">
                  <MdBarChart size={40} className="mb-2 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-600">
                    Pending Signatures
                  </h3>
                  <div className="text-2xl font-semibold">
                    {totalPendingLoading ? "Loading..." : totalPending}
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="relative flex-none w-full md:w-3/5 lg:w-3/5 p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-8 h-full flex flex-col justify-between">
              <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">
                Recent Activities
              </h2>
              <div className="mt-4 overflow-y-auto h-64">
                {recentActivitiesLoading ? (
                  "Loading"
                ) : recentActivitiesData.length > 0 ? (
                  <ul className="space-y-4">
                    {recentActivitiesData.map((doc, index) => (
                      <li
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-100 mb-4"
                      >
                        <div className="text-sm text-gray-500">
                          {`${packageMap[doc.packageType]} - ${truncate(
                            doc.sender
                          )} to ${truncate(doc.recipient)}`}
                        </div>
                        <div className="text-sm text-gray-400">
                          {`Created on: ${new Date(
                            doc.createdOn * 1000
                          ).toLocaleDateString()} | Last modified: ${new Date(
                            doc.lastModified * 1000
                          ).toLocaleDateString()}`}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-gray-500">No recent activities</div>
                  </div>
                )}
              </div>
              <Link
                href={
                  recentActivitiesData.length > 0
                    ? `https://sepolia.etherscan.io/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`
                    : `ethiring/package/add`
                }
                target={recentActivitiesData.length > 0 ? `_blank` : `_self`}
                className="absolute bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center"
              >
                {recentActivitiesData.length > 0
                  ? `View at Etherscan.io`
                  : `Craft Package`}
                <span className="ml-2">
                  {recentActivitiesData.length > 0 ? (
                    <MdBarChart size={25} />
                  ) : (
                    <MdAddBox size={25} />
                  )}
                </span>
              </Link>
            </div>
            <div className="flex-1 w-full md:w-2/5 lg:w-2/5 p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between">
              {pieChartLoading ? (
                "Loading..."
              ) : pieChartData.labels.length > 0 ? (
                <>
                  <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">
                    Package Completion by Type
                  </h2>
                  <div className="w-full h-64 flex items-center justify-center mt-4">
                    <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
                      <Pie data={pieChartData} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">
                    Package Completion by Type
                  </h2>
                  <div className="w-full h-64 flex items-center justify-center mt-4">
                    <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
                      <Image
                        src="/Nothing-Here-Illustration.jpg"
                        alt="No data is available"
                        layout="responsive"
                        width={256}
                        height={256}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

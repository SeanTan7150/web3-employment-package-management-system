"use client";

import { authedOnly } from "@/app/actions/auth";
import { readUserByAddress } from "@/services/service";
import { Sidebar } from "@/components/navigation/Sidebar";
import { useContractContext } from "@/context/contract";
import { UserResponse } from "@/models/user";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import {
  MdCancel,
  MdContentCopy,
  MdEdit,
  MdMail,
  MdVerifiedUser,
  MdViewInAr,
} from "react-icons/md";

export default function Profile() {
  useEffect(() => {
    const fetchJWT = async () => {
      await authedOnly();
    };
    fetchJWT();
  }, []);

  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  const { activeAccount } = useContractContext();

  const fetchProfile = async () => {
    if (activeAccount) {
      const { fetched, user }: UserResponse = await readUserByAddress(
        activeAccount.address
      );

      if (fetched) {
        setUserEmail(user.email);
        setUserFirstName(user.first_name);
        setUserLastName(user.last_name);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [userNewEmail, setUserNewEmail] = useState(userEmail);
  const [isEditingName, setIsEditingName] = useState(false);
  const [userNewFirstName, setUserNewFirstName] = useState(userFirstName);
  const [userNewLastName, setUserNewLastName] = useState(userLastName);

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };

  const handleCancelEditEmail = () => {
    setIsEditingEmail(false);
    setUserNewEmail(userEmail);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNewEmail(e.target.value);
  };

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleCancelEditName = () => {
    setIsEditingName(false);
    setUserNewFirstName(userFirstName);
    setUserNewLastName(userLastName);
  };

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNewFirstName(e.target.value);
  };

  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNewLastName(e.target.value);
  };

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

  return (
    <>
      <Sidebar />
      <div className="p-6">
        <div className={`mt-16 ${activeAccount ? "sm:ml-64" : null}`}>
          <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
            <div className="flex items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-6 rtl:space-x-reverse">
              <span className="relative">
                <Image
                  src="/jonathan-joestar.jpg"
                  alt="profile pic"
                  width={100}
                  height={100}
                  className="rounded-full shadow-lg"
                />
                <span className="bottom-0 left-[70px] absolute  w-5 h-5 bg-green-400 border-2 border-white rounded-full"></span>
              </span>

              <div>
                <ul className="ml-6">
                  <li className="flex items-center space-x-2 font-semibold text-lg uppercase">
                    <span className="mr-2 text-gray-400">
                      <MdVerifiedUser size={20} />
                    </span>
                    {!isEditingName ? (
                      <>{`${userFirstName} ${userLastName}`}</>
                    ) : (
                      <>
                        <input
                          type="text"
                          id="newFirstName"
                          placeholder="0xnew"
                          value={userNewFirstName}
                          onChange={handleChangeFirstName}
                          className={`border border-gray-300 rounded bg-white w-32`}
                        />
                        <input
                          type="text"
                          id="newLastName"
                          placeholder="0xuser"
                          value={userNewLastName}
                          onChange={handleChangeLastName}
                          className={`border border-gray-300 rounded bg-white w-32`}
                        />
                      </>
                    )}
                    <>
                      {!isEditingName ? (
                        <button
                          type="button"
                          onClick={handleEditName}
                          className="ml-2 text-gray-500 hover:text-blue-600"
                        >
                          <MdEdit size={20} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleCancelEditName}
                          className="ml-2 text-red-500 hover:text-red-600"
                        >
                          <MdCancel size={20} />
                        </button>
                      )}
                    </>
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
                    {!isEditingEmail ? (
                      <>
                        {userEmail ? (
                          userEmail
                        ) : (
                          <span className="text-gray-500">
                            0xemail@ethiring.com
                          </span>
                        )}
                      </>
                    ) : (
                      <input
                        type="email"
                        id="newEmail"
                        placeholder="0xemail@eth.com"
                        value={userNewEmail}
                        onChange={handleChangeEmail}
                        className={`border border-gray-300 rounded bg-white`}
                      />
                    )}
                    <>
                      {!isEditingEmail ? (
                        <button
                          type="button"
                          onClick={handleEditEmail}
                          className="ml-2 text-gray-500 hover:text-blue-600"
                        >
                          <MdEdit size={20} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleCancelEditEmail}
                          className="ml-2 text-red-500 hover:text-red-600"
                        >
                          <MdCancel size={20} />
                        </button>
                      )}
                    </>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

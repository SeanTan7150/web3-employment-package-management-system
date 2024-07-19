"use client";

import { useContractContext } from "@/context/contract";
import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdEmojiPeople } from "react-icons/md";
import { createUser, readUser, User } from "../api/users/service";
import { Alert } from "@/components/alert/Alert";
import { useRouter } from "next/navigation";

interface UserData {
  user: User;
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { address } = useContractContext();
  const truncateAddress = address
    ? `${address.slice(0, 24)}...${address.slice(-4)}`
    : "";
  const router = useRouter();

  const fetchUser = async () => {
    setIsLoading(true);
    const data = (await readUser(address)) as UserData;
    if (data && data.user && Object.keys(data.user).length > 0) {
      router.push("/");
    }
    setIsLoading(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (address && email && firstName && lastName) {
      setIsLoading(true);
      await createUser(address, email, firstName, lastName);
      router.push("/");
      setIsLoading(false);
    } else {
      setIsAlert(true);
    }
  };

  useEffect(() => {
    if (address) {
      fetchUser();
    }
  }, [address]);

  return (
    <>
      {isAlert && (
        <Alert
          message="Metamask is not connected."
          onClose={() => setIsAlert(false)}
        />
      )}

      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-14 flex flex-col items-center">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
                <span>
                  <MdEmojiPeople size={40} />
                </span>
              </div>

              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className={`w-full mb-4 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      required
                      autoComplete="off"
                      disabled={isLoading}
                    />
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className={`w-full mb-4 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      required
                      autoComplete="off"
                      disabled={isLoading}
                    />
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className={`w-full mb-4 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      required
                      autoComplete="off"
                      disabled={isLoading}
                    />
                    <ConnectWallet
                      theme={"dark"}
                      btnTitle={"Connect Metamask"}
                      className="connectButton"
                      detailsBtn={() => {
                        return (
                          <button
                            type="button"
                            className={`w-full mb-4 px-8 py-4 rounded-lg font-medium bg-gray-200 border border-gray-600 placeholder-gray-500 text-sm hover:bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white hover:border-white ${
                              isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={isLoading}
                          >
                            {truncateAddress}
                          </button>
                        );
                      }}
                    />
                    <button
                      type="submit"
                      className={`mt-1 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={isLoading || !address}
                    >
                      <span>{!isLoading ? "Sign Up" : "Just a sec..."}</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
              <Image
                src="/registration-form-illustration.png"
                width={500}
                height={500}
                alt="Registration form illustration"
                className="mx-auto mt-16"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

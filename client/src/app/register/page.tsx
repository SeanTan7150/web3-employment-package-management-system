"use client";

import { UserResponse } from "@/models/user";
import { createUser, readUserByAddress } from "@/services/service";
import { ethers } from "ethers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdEmojiPeople } from "react-icons/md";

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [connectedAddress, setConnectedAddress] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (window?.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const activeAccount = await provider.getSigner().getAddress();
        setConnectedAddress(activeAccount);
        const { fetched } = await readUserByAddress(activeAccount);
        if (fetched) {
          // user exists
          router.push("/");
        }
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (window?.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const activeAccount = await provider.getSigner().getAddress();
      await createUser(activeAccount, email, firstName, lastName);
    }
    setIsLoading(false);
    router.push("/");
  };

  return (
    <>
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

                    <button
                      type="submit"
                      className={`mt-1 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={isLoading || !connectedAddress}
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

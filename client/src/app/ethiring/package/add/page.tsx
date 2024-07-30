"use client";

import { authedOnly } from "@/app/actions/auth";
import { Sidebar } from "@/components/navigation/Sidebar";
import { useContractContext } from "@/context/contract";
import {
  EMPLOYEE_PACKAGES,
  EMPLOYER_PACKAGES,
  Package,
} from "@/models/packageConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";

interface PackageGridProps {
  isEmployer: boolean;
}

export default function Add() {
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

  const [isEmployer, setIsEmployer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { activeAccount, getEmployer } = useContractContext();

  useEffect(() => {
    if (isAuthVerified) {
      const fetchEmployer = async () => {
        setIsLoading(true);
        try {
          const data = await getEmployer();
          if (data && data == activeAccount?.address) {
            setIsEmployer(true);
          } else {
            setIsEmployer(false);
          }
        } catch (error) {
          console.error("Error fetching employer: ", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchEmployer();
    }
  }, [activeAccount, getEmployer, isAuthVerified]);

  if (isAuthLoading || !isAuthVerified) {
    return (
      <div className="p-6">
        <div className="mt-16">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="p-6">
        <div className={`mt-20 sm:ml-64`}>
          {!isLoading ? (
            <PackageGrid isEmployer={isEmployer} />
          ) : (
            <PackageSkeletonGrid />
          )}
        </div>
      </div>
    </>
  );
}

const PackageGrid = ({ isEmployer }: PackageGridProps) => (
  <div className="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto gap-y-4 sm:gap-x-4 sm:grid-cols-2 lg:grid-cols-3 sm:text-left">
    {isEmployer
      ? EMPLOYER_PACKAGES.map((pkg) => <PackageItem key={pkg.path} {...pkg} />)
      : EMPLOYEE_PACKAGES.map((pkg) => <PackageItem key={pkg.path} {...pkg} />)}
  </div>
);

const PackageItem = ({ path, title, description }: Package) => (
  <div className="flex flex-col justify-center">
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
      <Link href={path}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 hover:text-blue-600">
          {title}
        </h5>
      </Link>
      <p className="mb-3 font-normal text-gray-700">{description}</p>
      <Link
        href={path}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Craft package
        <span>
          <MdArrowRightAlt className="ml-2" size={25} onMouseLeave={() => {}} />
        </span>
      </Link>
    </div>
  </div>
);

const PackageSkeletonGrid = () => (
  <div className="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto gap-y-4 sm:gap-x-4 sm:grid-cols-2 lg:grid-cols-3 sm:text-left animate-pulse">
    {[...Array(8)].map((_, index) => (
      <PackageSkeletonItem key={index} />
    ))}
    <span className="sr-only">Loading...</span>
  </div>
);

const PackageSkeletonItem = () => (
  <div className="flex flex-col justify-center">
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
      <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full"></div>
    </div>
  </div>
);

"use client";

import { useContractContext } from "@/context/contract";
import { PackageFormContextProvider } from "@/context/offer/packageForm";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";

interface PackageItemProps {
  path: string;
  title: string;
  description: string;
}

export default function Add() {
  const [isEmployer, setIsEmployer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { address, getEmployer } = useContractContext();

  const fetchEmployer = async () => {
    setIsLoading(true);
    const data = await getEmployer();
    if (data && data == address) {
      setIsEmployer(true);
    } else {
      setIsEmployer(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEmployer();
  }, [address]);

  return (
    <>
      <div className={`mt-20 sm:ml-64`}>
        {!isLoading ? (
          <div className="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto gap-y-4 sm:gap-x-4 sm:grid-cols-2 lg:grid-cols-3 sm:text-left">
            {isEmployer ? (
              <>
                <PackageItem
                  path="/package/add/offer"
                  title="Offer"
                  description="Congratulations! An exciting job offer is extended. Welcome aboard!"
                />

                <PackageItem
                  path="/package/add/promotion"
                  title="Promotion"
                  description="Pleased to announce a promotion. New responsibilities await!"
                />

                <PackageItem
                  path="/package/add/termination"
                  title="Termination"
                  description="Regretfully, employment is terminated. Best wishes for future endeavors."
                />

                <PackageItem
                  path="/package/add/contract_renewal"
                  title="Contract Renewal"
                  description="Good news! Contract has been renewed for another term."
                />

                <PackageItem
                  path="/package/add/salary_increase"
                  title="Salary Increase"
                  description="Great news! Salary increase approved for the role."
                />

                <PackageItem
                  path="#"
                  title="Bonus"
                  description="Enjoy this bonus! Extra rewards earned for outstanding performance."
                />

                <PackageItem
                  path="#"
                  title="Transfer"
                  description="Transfer to a new department or role has been arranged."
                />

                <PackageItem
                  path="#"
                  title="Warning"
                  description="This is a performance warning. Immediate improvement is necessary."
                />

                <PackageItem
                  path="#"
                  title="Employment Verification"
                  description="Providing employment verification for proof of job status."
                />

                <PackageItem
                  path="#"
                  title="Job Description"
                  description="Detailed job description outlining role and responsibilities."
                />

                <PackageItem
                  path="#"
                  title="Training Completion"
                  description="Congratulations on successfully completing the training program!"
                />

                <PackageItem
                  path="#"
                  title="Probation Period Completion"
                  description="Congratulations on completing the probation period. Welcome aboard!"
                />

                <PackageItem
                  path="#"
                  title="Leave Approval"
                  description="Leave request approved. Enjoy the time off!"
                />

                <PackageItem
                  path="#"
                  title="Reference"
                  description="Providing a reference for the next career opportunity."
                />

                <PackageItem
                  path="#"
                  title="Relocation"
                  description="Relocation to a new place arranged. Best of luck!"
                />

                <PackageItem
                  path="#"
                  title="End of Contract"
                  description="Contract has ended. Thank you for valuable contributions!"
                />

                <PackageItem
                  path="#"
                  title="Change in Employment Terms"
                  description="Notice of changes in employment terms. Please review and acknowledge."
                />
              </>
            ) : (
              <>
                <PackageItem
                  path="#"
                  title="Resignation"
                  description="Time to say goodbye! This is a resignation letter with an exit plan."
                />

                <PackageItem
                  path="#"
                  title="Retirement"
                  description="Happy retirement! Time to relax and enjoy life after work."
                />
              </>
            )}
          </div>
        ) : (
          <div className="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto gap-y-4 sm:gap-x-4 sm:grid-cols-2 lg:grid-cols-3 sm:text-left animate-pulse">
            <PackageSkeletonItem />
            <PackageSkeletonItem />
            <PackageSkeletonItem />
            <PackageSkeletonItem />
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
}

const PackageItem = ({ path, title, description }: PackageItemProps) => (
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

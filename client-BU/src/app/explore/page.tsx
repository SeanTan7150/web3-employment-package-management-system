"use client";

import { ParsedJob, useContractContext } from "@/constants/web3EthContract";
import { useEffect, useState } from "react";
import Link from "next/link";
import { JobData, jobDataTypes } from "@/models/jobData";
import { getWeb3Instance } from "@/constants/web3Providers";
import { formatDistanceToNow } from "date-fns";
import { MdOutlineWork, MdLocationOn } from "react-icons/md";

interface Jobs {
  job: ParsedJob;
  detail: JobData;
}

export default function explore() {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { contract, getJobs } = useContractContext();

  const fetchJobs = async () => {
    setIsLoading(true);

    const data = await getJobs();
    const tmpJobs: Jobs[] = [];

    if (data) {
      data.forEach((job) => {
        if (job.job.encodedJobDetails) {
          const decodedData = getWeb3Instance().eth.abi.decodeParameters(
            jobDataTypes,
            job.job.encodedJobDetails
          );

          const detail: JobData = {
            title: decodedData[0] as string,
            workplace: decodedData[1] as string,
            country: decodedData[2] as string,
            state: decodedData[3] as string,
            city: decodedData[4] as string,
            postal: decodedData[5] as string,
            addressLine1: decodedData[6] as string,
            addressLine2: decodedData[7] as string,
            employmentType: decodedData[8] as string,
            descriptionAbout: decodedData[9] as string,
            responsibilities: decodedData[10] as string[],
            requirements: decodedData[11] as string[],
            minSalary: parseInt(decodedData[12] as string),
            maxSalary: parseInt(decodedData[13] as string),
            healthInsurance: decodedData[14] as boolean,
            retirementPlans: decodedData[15] as boolean,
            paidTimeOff: decodedData[16] as boolean,
            flexibleWorkSchedules: decodedData[17] as boolean,
            wellnessPrograms: decodedData[18] as boolean,
            lifeInsurance: decodedData[19] as boolean,
            disabilityInsurance: decodedData[20] as boolean,
            employeeAssistancePrograms: decodedData[21] as boolean,
            stockOptionsOrEquity: decodedData[22] as boolean,
            performanceBonuses: decodedData[23] as boolean,
            remoteWorkOpportunities: decodedData[24] as boolean,
            professionalDevelopmentAndTraining: decodedData[25] as boolean,
            companySponsoredEventsAndActivities: decodedData[26] as boolean,
            freeOrSubsidizedMealsSnacks: decodedData[27] as boolean,
            onSiteAmenities: decodedData[28] as boolean,
            transportationBenefits: decodedData[29] as boolean,
            employeeDiscounts: decodedData[30] as boolean,
            flexibleSpendingAccounts: decodedData[31] as boolean,
          };
          tmpJobs.push({ job, detail });
        }
      });
    }
    setJobs(tmpJobs);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchJobs();
    }
  }, [contract]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        {jobs ? (
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
            {jobs.map((job) => (
              <Link href={`/explore/${job.job.id}`} key={job.job.id}>
                <div className="relative group cursor-pointer justify-center max-w-sm p-8 border border-gray-200 rounded-lg shadow bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out">
                  <div className="flex items-center mb-4">
                    <h5 className="text-2xl font-bold tracking-light text-gray-900">
                      {isLoading ? "loading..." : job.detail.title}
                    </h5>
                  </div>
                  <div className="flex flex-col mb-2">
                    <div className="flex items-center">
                      <span>
                        <MdLocationOn className="mr-1" />
                      </span>
                      <p className="leading-relaxed text-gray-700">
                        {isLoading
                          ? "loading..."
                          : `${job.detail.city}, ${job.detail.country}`}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <span>
                        <MdOutlineWork className="mr-1" />
                      </span>
                      <p className="leading-relaxed text-gray-700">
                        {isLoading ? (
                          "loading..."
                        ) : (
                          <span>
                            {job.detail.workplace} <span>&bull;</span>{" "}
                            {job.detail.employmentType}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col mt-auto">
                    <p className="text-sm text-gray-500">
                      Posted by{" "}
                      {isLoading ? (
                        "loading..."
                      ) : (
                        <span className="text-blue-600">
                          {job.job.job.postedBy.slice(0, 6) +
                            "..." +
                            job.job.job.postedBy.slice(-4)}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      {isLoading
                        ? "loading..."
                        : formatDistanceToNow(
                            new Date(job.job.job.postedOn * 1000),
                            {
                              addSuffix: true,
                            }
                          )}
                    </p>
                    <span className="absolute bottom-2 right-2 text-blue-600 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                      View more
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

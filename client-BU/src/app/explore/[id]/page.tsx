"use client";

import { ParsedJob, useContractContext } from "@/constants/web3EthContract";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { JobData, jobDataTypes } from "@/models/jobData";
import { getWeb3Instance } from "@/constants/web3Providers";
import { formatDistanceToNow } from "date-fns";
import { MdOutlineWork, MdLocationOn } from "react-icons/md";

export default function JobDetail() {
  const [job, setJob] = useState<ParsedJob | null>(null);
  const [detail, setDetail] = useState<JobData | null>(null);
  const [error, setError] = useState<boolean>(false);

  const pathname = usePathname(); // Get the entire path
  const jobId = pathname.split("/").slice(-1)[0];

  const { contract, getJobs } = useContractContext();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobs();

        if (data) {
          const selectedJob = data[Number(jobId)];
          setJob(selectedJob);

          if (selectedJob.job.encodedJobDetails) {
            const decodedData = getWeb3Instance().eth.abi.decodeParameters(
              jobDataTypes,
              selectedJob.job.encodedJobDetails
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
            setDetail(detail);
          }
        }
      } catch (error) {
        setError(true);
        console.error(error);
      }
    };
    fetchJob();
  }, [contract, jobId]);

  if (error) {
    return <div>Job does not exist</div>;
  }

  if (!job || !detail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <h3 className="text-xl font-bold text-gray-800">{detail.title}</h3>
          <p className="leading-relaxed text-gray-500">
            {detail.addressLine1}
            {detail.addressLine2 ? `, ${detail.addressLine2}` : null},{" "}
            {detail.city}, {detail.postal}, {detail.state}, {detail.country}
          </p>
          <ul className="mt-4 space-y-4 text-gray-800">
            <li className="text-sm">
              WORKPLACE{" "}
              <span className="ml-2 float-right">{detail.workplace}</span>
            </li>
            <li className="text-sm">
              EMPLOYMENT TYPE{" "}
              <span className="ml-2 float-right">{detail.employmentType}</span>
            </li>
            <li className="text-sm">
              MIN SALARY{" "}
              <span className="ml-2 float-right">${detail.minSalary}</span>
            </li>
            <li className="text-sm">
              MAX SALARY{" "}
              <span className="ml-2 float-right">${detail.maxSalary}</span>
            </li>
          </ul>
        </div>

        <div className="shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <h3 className="text-xl font-bold text-gray-800">About the job</h3>
          <p className="mt-2 text-justify">{detail.descriptionAbout}</p>
        </div>

        <div className="shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <h3 className="text-xl font-bold text-gray-800">Responsibilities</h3>
          <p className="mt-2 text-justify">{detail.responsibilities}</p>
        </div>

        <div className="shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <h3 className="text-xl font-bold text-gray-800">Requirements</h3>
          <p className="mt-2">{detail.requirements}</p>
        </div>
      </div>
    </>
  );
}

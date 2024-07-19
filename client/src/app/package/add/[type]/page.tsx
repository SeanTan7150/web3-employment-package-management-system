"use client";

import { Step } from "@/components/form/Step";
import { useEffect, useState } from "react";

const titleMap: { [key: string]: string } = {
  offer: "Offer Letter",
  promotion: "Promotion Letter",
  resignation: "Resignation Letter",
  termination: "Termination Letter",
  contract_renewal: "Contract Renewal Letter",
  salary_increase: "Salary Increase Letter",
  bonus: "Bonus Letter",
  transfer: "Transfer Letter",
  warning: "Warning Letter",
  employment_verification: "Employment Verification Letter",
  job_description: "Job Description Letter",
  training_completion: "Training Completion Letter",
  probation_period_completion: "Probation Period Completion Letter",
  leave_approval: "Leave Approval Letter",
  reference: "Reference Letter",
  relocation: "Relocation Letter",
  retirement: "Retirement Letter",
  end_of_contract: "End of Contract Letter",
  change_in_employment_terms: "Change in Employment Terms Letter",
};

type ParamsType = keyof typeof titleMap;

export default function Constructor({ params }: { params: { type: string } }) {
  const [title, setTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    setTitle(titleMap[params.type]);
  }, [params.type]);

  return (
    <>
      <div className="flex justify-center items-center mt-20">
        <div className="max-w-xl w-full border p-6 rounded-md bg-gray-100">
          <h1 className="text-xl font-semibold text-center">
            {`${title} Constructor`}
          </h1>
          <Step type={params.type} />
        </div>
      </div>
    </>
  );
}

"use client";

import { authedOnly } from "@/app/actions/auth";
import DynamicForm from "@/components/form/page";
import { Loader } from "@/components/loader/Loader";
import { Sidebar } from "@/components/navigation/Sidebar";
import { useContractContext } from "@/context/contract";
import {
  BonusLetter,
  ChangeInEmploymentTermsLetter,
  ContractRenewalLetter,
  EmploymentVerificationLetter,
  EndOfContractLetter,
  JobDescriptionLetter,
  LeaveApprovalLetter,
  OfferLetter,
  ProbationPeriodCompletionLetter,
  PromotionLetter,
  ReferenceLetter,
  RelocationLetter,
  ResignationLetter,
  RetirementLetter,
  SalaryIncreaseLetter,
  TerminationLetter,
  TrainingCompletionLetter,
  TransferLetter,
  WarningLetter,
} from "@/models/package";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CraftPackage({ params }: { params: { type: string } }) {
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
  const [isEmployer, setIsEmployer] = useState(false);
  const { getEmployer } = useContractContext();

  let title = "";
  let docType = null;
  let schema:
    | OfferLetter
    | PromotionLetter
    | ResignationLetter
    | TerminationLetter
    | ContractRenewalLetter
    | SalaryIncreaseLetter
    | BonusLetter
    | TransferLetter
    | WarningLetter
    | EmploymentVerificationLetter
    | JobDescriptionLetter
    | TrainingCompletionLetter
    | ProbationPeriodCompletionLetter
    | LeaveApprovalLetter
    | ReferenceLetter
    | RelocationLetter
    | RetirementLetter
    | EndOfContractLetter
    | ChangeInEmploymentTermsLetter;

  switch (params.type) {
    case "offer":
      title = "Offer Letter Constructor";
      docType = 0;
      schema = {
        fullName: "",
        position: "",
        department: "",
        responsibilities: "",
        workSchedule: "",
        startDate: new Date(),
        salary: 0,
        benefits: "",
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    case "promotion":
      title = "Promotion Letter Constructor";
      docType = 1;
      schema = {
        fullName: "",
        position: "",
        department: "",
        newPosition: "",
        effectiveDate: new Date(),
        newSalary: 0,
        newResponsibilities: "",
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    case "resignation":
      title = "Resignation Letter Constructor";
      docType = 2;
      schema = {
        fullName: "",
        position: "",
        department: "",
        resignationDate: new Date(),
        lastWorkingDate: new Date(),
        reason: "",
        expiry: new Date(),
      };
      break;
    case "termination":
      title = "Termination Letter Constructor";
      docType = 3;
      schema = {
        fullName: "",
        position: "",
        department: "",
        terminationDate: new Date(),
        reason: "",
        severanceDetails: "",
        companyPropertyReturn: "",
        expiry: new Date(),
      };
      break;
    case "contract_renewal":
      title = "Contract Renewal Letter Constructor";
      docType = 4;
      schema = {
        fullName: "",
        position: "",
        department: "",
        renewalStartDate: new Date(),
        renewalEndDate: new Date(),
        newSalary: 0,
        newBenefits: "",
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    case "salary_increase":
      title = "Salary Increase Letter Constructor";
      docType = 5;
      schema = {
        fullName: "",
        position: "",
        department: "",
        currentSalary: 0,
        newSalary: 0,
        effectiveDate: new Date(),
        reason: "",
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    case "bonus":
      title = "Bonus Letter Constructor";
      docType = 6;
      schema = {
        fullName: "",
        position: "",
        department: "",
        bonusAmount: 0,
        reason: "",
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    case "transfer":
      title = "Transfer Letter Constructor";
      docType = 7;
      schema = {
        fullName: "",
        position: "",
        department: "",
        newPosition: "",
        newDepartment: "",
        effectiveDate: new Date(),
        reason: "",
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    case "warning":
      title = "Warning Letter Constructor";
      docType = 8;
      schema = {
        fullName: "",
        position: "",
        department: "",
        issueDate: new Date(),
        issueDescription: "",
        previousWarnings: "",
        expectedImprovements: "",
        nonImprovementConsequences: "",
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    case "employment_verification":
      title = "Employment Verification Letter Constructor";
      docType = 9;
      schema = {
        fullName: "",
        position: "",
        department: "",
        startDate: new Date(),
        employmentStatus: "",
        salary: 0,
        employmentEndDate: new Date(),
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    case "job_description":
      title = "Job Description Letter Constructor";
      docType = 10;
      schema = {
        fullName: "",
        position: "",
        department: "",
        startDate: new Date(),
        responsibilities: "",
        workSchedule: "",
        performanceExpectations: "",
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    case "training_completion":
      title = "Training Completion Letter Constructor";
      docType = 11;
      schema = {
        fullName: "",
        position: "",
        department: "",
        trainingProgram: "",
        completionDate: new Date(),
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    case "probation_period_completion":
      title = "Probation Period Completion Letter Constructor";
      docType = 12;
      schema = {
        fullName: "",
        position: "",
        department: "",
        probationEndDate: new Date(),
        performanceSummary: "",
        employmentConfirmation: "",
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    case "leave_approval":
      title = "Leave Approval Letter Constructor";
      docType = 13;
      schema = {
        fullName: "",
        position: "",
        department: "",
        leaveStartDate: new Date(),
        leaveEndDate: new Date(),
        leaveType: "",
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    case "reference":
      title = "Reference Letter Constructor";
      docType = 14;
      schema = {
        fullName: "",
        position: "",
        department: "",
        employmentStartDate: new Date(),
        employmentEndDate: new Date(),
        skills: "",
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    case "relocation":
      title = "Relocation Letter Constructor";
      docType = 15;
      schema = {
        fullName: "",
        position: "",
        department: "",
        newLocation: "",
        newPosition: "",
        effectiveDate: new Date(),
        relocationAssistanceDetails: "",
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    case "retirement":
      title = "Retirement Letter Constructor";
      docType = 16;
      schema = {
        fullName: "",
        position: "",
        department: "",
        retirementDate: new Date(),
        retirementBenefits: "",
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    case "end_of_contract":
      title = "End of Contract Letter Constructor";
      docType = 17;
      schema = {
        fullName: "",
        position: "",
        department: "",
        contractEndDate: new Date(),
        reason: "",
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    case "change_in_employment_terms":
      title = "Change in Employment Terms Letter Constructor";
      docType = 18;
      schema = {
        fullName: "",
        position: "",
        department: "",
        effectiveDate: new Date(),
        newTerms: "",
        reason: "",
        supervisorName: "",
        expiry: new Date(),
      };
      break;
    default:
      return null;
  }

  useEffect(() => {
    if (isAuthVerified) {
      const checkIsEmployer = async () => {
        try {
          const employer = await getEmployer();
          if (window?.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const activeAccount = await provider.getSigner().getAddress();
            if (activeAccount.toLowerCase() === employer.toLowerCase()) {
              setIsEmployer(true);
            }
          }
        } catch (error) {
          console.error("Error fetching employer: ", error);
        } finally {
          setIsLoading(false);
        }
      };
      checkIsEmployer();
    }
  }, [getEmployer, isAuthVerified]);

  if (isLoading || isAuthLoading || !isAuthVerified) {
    return (
      <>
        <div className="p-6">
          <div className="flex justify-center items-center mt-16 sm:ml-64">
            Loading...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <CraftPackageForm
        title={title}
        docType={docType}
        schema={schema}
        isEmployer={isEmployer}
      />
    </>
  );
}

const CraftPackageForm = ({
  title,
  docType,
  schema,
  isEmployer,
}: {
  title: string;
  docType: number;
  schema:
    | OfferLetter
    | PromotionLetter
    | ResignationLetter
    | TerminationLetter
    | ContractRenewalLetter
    | SalaryIncreaseLetter
    | BonusLetter
    | TransferLetter
    | WarningLetter
    | EmploymentVerificationLetter
    | JobDescriptionLetter
    | TrainingCompletionLetter
    | ProbationPeriodCompletionLetter
    | LeaveApprovalLetter
    | ReferenceLetter
    | RelocationLetter
    | RetirementLetter
    | EndOfContractLetter
    | ChangeInEmploymentTermsLetter;
  isEmployer: boolean;
}) => {
  const [loadStatus, setLoadStatus] = useState(0);
  const [tempTx, setTempTx] = useState<string | null>(null);
  const router = useRouter();

  const handleChildResponse = (response: {
    status: number;
    txHash: string | null;
  }) => {
    const { status, txHash } = response;
    setLoadStatus(status);
    setTempTx(txHash);
  };

  if (loadStatus == 1) {
    return <Loader subtitle="Cooking up the docs!" />;
  }

  if (loadStatus == 2) {
    return <Loader subtitle="Revving the blockchain engine..." />;
  }

  if (loadStatus == 3) {
    return <Loader subtitle="Wrapping up your documents with style!" />;
  }

  if (loadStatus == 4) {
    return <Loader subtitle="Uploading your package to IPFS..." />;
  }

  if (loadStatus == 5) {
    return <Loader subtitle="Securing your autograph..." />;
  }

  if (loadStatus == 6) {
    return <Loader subtitle="Awaiting your magic touch..." />;
  }

  if (loadStatus == 7 && tempTx) {
    return (
      <Loader subtitle="Prepping your digital awesomeness..." tx={tempTx} />
    );
  }

  if (loadStatus == 8 && tempTx) {
    router.push("/ethiring/package/view/sent");
    return <Loader subtitle="Hold tight, greatness incoming..." tx={tempTx} />;
  }

  return (
    <>
      <Sidebar />
      <div className="p-6">
        <div className={`flex justify-center items-center mt-16 sm:ml-64`}>
          <div className="max-w-xl w-full border p-6 rounded-md bg-gray-100">
            <h1 className="text-xl font-semibold text-center mb-2">{title}</h1>
            <DynamicForm
              docType={docType}
              schema={schema}
              isEmployer={isEmployer}
              onResponse={handleChildResponse}
            />
          </div>
        </div>
      </div>
    </>
  );
};

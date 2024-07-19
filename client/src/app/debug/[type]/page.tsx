"use client";

import DynamicForm from "@/components/debugForm/page";
import { useContractContext } from "@/context/contract";
import {
  OfferLetter,
  PromotionLetter,
  ResignationLetter,
  TerminationLetter,
} from "@/models/package";

export default function Debug({ params }: { params: { type: string } }) {
  let title = "";
  let schema:
    | OfferLetter
    | PromotionLetter
    | ResignationLetter
    | TerminationLetter;

  switch (params.type) {
    case "offer":
      title = "Offer Letter Constructor";
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
        supervisorPosition: "",
        companyName: "Ethiring",
        offerExpiryDate: new Date(),
        employerContact: "",
      };
      break;
    case "promotion":
      title = "Promotion Letter Constructor";
      schema = {
        fullName: "",
        position: "",
        department: "",
        newPosition: "",
        effectiveDate: new Date(),
        newSalary: 0,
        newResponsibilities: "",
        supervisorName: "",
        supervisorPosition: "",
        companyName: "Ethiring",
      };
      break;
    case "resignation":
      title = "Resignation Letter Constructor";
      schema = {
        fullName: "",
        position: "",
        department: "",
        resignationDate: new Date(),
        lastWorkingDate: new Date(),
        reason: "",
        employerContact: "",
      };
      break;
    case "termination":
      title = "Termination Letter Constructor";
      schema = {
        fullName: "",
        position: "",
        department: "",
        terminationDate: new Date(),
        reason: "",
        severanceDetails: "",
        companyPropertyReturn: "",
        employerContact: "",
      };
      break;
    default:
      return null;
  }

  return (
    <>
      <CraftPackageForm title={title} schema={schema} />
    </>
  );
}

const CraftPackageForm = ({
  title,
  schema,
}: {
  title: string;
  schema: OfferLetter | PromotionLetter | ResignationLetter | TerminationLetter;
}) => {
  const { address } = useContractContext();

  return (
    <div
      className={`flex justify-center items-center mt-20 ${
        address ? "sm:ml-64" : ""
      }`}
    >
      <div className="max-w-xl w-full border p-6 rounded-md bg-gray-100">
        <h1 className="text-xl font-semibold text-center">{title}</h1>
        <DynamicForm schema={schema} />
      </div>
    </div>
  );
};

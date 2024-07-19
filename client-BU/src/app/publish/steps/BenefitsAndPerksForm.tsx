"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "@/components/form/PublishJobForm";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { benefitsData, perksData } from "@/constants/data/data";
import { getWeb3Instance } from "@/constants/web3Providers";
import { useContractContext } from "@/constants/web3EthContract";

type TFormValues = {
  // Benefits
  healthInsurance: boolean;
  retirementPlans: boolean;
  paidTimeOff: boolean;
  flexibleWorkSchedules: boolean;
  wellnessPrograms: boolean;
  lifeInsurance: boolean;
  disabilityInsurance: boolean;
  employeeAssistancePrograms: boolean;

  // Perks
  stockOptionsOrEquity: boolean;
  performanceBonuses: boolean;
  remoteWorkOpportunities: boolean;
  professionalDevelopmentAndTraining: boolean;
  companySponsoredEventsAndActivities: boolean;
  freeOrSubsidizedMealsSnacks: boolean;
  onSiteAmenities: boolean;
  transportationBenefits: boolean;
  employeeDiscounts: boolean;
  flexibleSpendingAccounts: boolean;
};

export function BenefitsAndPerksForm() {
  const [isPublished, setIsPublished] = useState(false);
  const { handleBackStep, setFormData, formData } = useFormState();
  const { register, handleSubmit } = useForm<TFormValues>({
    defaultValues: formData,
  });

  const { publishJob } = useContractContext();

  function handleFormSubmit(data: TFormValues) {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
    setIsPublished(true);
  }

  useEffect(() => {
    if (isPublished) {
      const values = [
        formData.title,
        formData.workplace,
        formData.country,
        formData.state,
        formData.city,
        formData.postal,
        formData.addressLine1,
        formData.addressLine2,
        formData.employmentType,
        formData.descriptionAbout,
        formData.responsibilities,
        formData.requirements,
        formData.minSalary,
        formData.maxSalary,
        formData.healthInsurance,
        formData.retirementPlans,
        formData.paidTimeOff,
        formData.flexibleWorkSchedules,
        formData.wellnessPrograms,
        formData.lifeInsurance,
        formData.disabilityInsurance,
        formData.employeeAssistancePrograms,
        formData.stockOptionsOrEquity,
        formData.performanceBonuses,
        formData.remoteWorkOpportunities,
        formData.professionalDevelopmentAndTraining,
        formData.companySponsoredEventsAndActivities,
        formData.freeOrSubsidizedMealsSnacks,
        formData.onSiteAmenities,
        formData.transportationBenefits,
        formData.employeeDiscounts,
        formData.flexibleSpendingAccounts,
      ];

      const types = [
        "string",
        "string",
        "string",
        "string",
        "string",
        "string",
        "string",
        "string",
        "string",
        "string",
        "string",
        "string[]",
        "uint256",
        "uint256",
        "bool",
        "bool",
        "bool",
        "bool",
        "bool",
        "bool",
        "bool",
        "bool",
        "bool",
        "bool",
        "bool",
        "bool",
        "bool",
        "bool",
        "bool",
        "bool",
        "bool",
        "bool",
      ];

      const encodedData = getWeb3Instance().eth.abi.encodeParameters(
        types,
        values
      );

      console.log("encoded: ", encodedData);

      publishJob(encodedData);
    }
  }, [isPublished]);

  return isPublished ? (
    <>
      <div>Published</div>
      <pre>{JSON.stringify(formData)}</pre>
    </>
  ) : (
    <>
      <form
        className="max-w-lg md:max-w-2xl mx-auto my-6"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <h5 className="tracking-wide w-max-content mb-4 bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
          Benefits
        </h5>
        <div className="flex flex-wrap justify-center gap-4">
          {benefitsData.map((benefit) => (
            <label
              key={benefit.id}
              className="relative cursor-pointer"
              htmlFor={benefit.id}
            >
              <input
                className="sr-only peer"
                type="checkbox"
                id={benefit.id}
                {...register(benefit.id as keyof TFormValues)}
              />
              <span className="absolute top-2 right-2 z-10 transition-all opacity-0 peer-checked:opacity-100">
                <FaCheckCircle
                  className="fill-blue-500 stroke-white"
                  width="36"
                  height="36"
                />
              </span>
              <div className="overflow-hidden rounded-lg bg-white shadow-md ring ring-transparent peer-checked:ring-blue-500 grayscale peer-checked:grayscale-0 active:scale-95 transition-all">
                <div>
                  <Image
                    className="h-28 w-48 object-cover"
                    src={benefit.imageUrl}
                    alt=""
                  />
                  <header className="p-2.5 w-48">
                    <p className="leading-tight break-words text-sm font-bold tracking-wide text-gray-700 mb-2">
                      {benefit.label}
                    </p>
                    <p className="leading-tight break-words text-xs text-gray-400">
                      {benefit.description}
                    </p>
                  </header>
                </div>
              </div>
            </label>
          ))}
        </div>

        <h5 className="mt-4 tracking-wide w-max-content mb-4 bg-yellow-100 text-yellow-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-800 ms-2">
          Perks
        </h5>
        <div className="flex flex-wrap justify-center gap-4">
          {perksData.map((perk) => (
            <label
              key={perk.id}
              className="relative cursor-pointer"
              htmlFor={perk.id}
            >
              <input
                className="sr-only peer"
                type="checkbox"
                id={perk.id}
                {...register(perk.id as keyof TFormValues)}
              />
              <span className="absolute top-2 right-2 z-10 transition-all opacity-0 peer-checked:opacity-100">
                <FaCheckCircle
                  className="fill-yellow-500 stroke-white"
                  width="36"
                  height="36"
                />
              </span>
              <div className="overflow-hidden rounded-lg bg-white shadow-md ring ring-transparent peer-checked:ring-yellow-500 grayscale peer-checked:grayscale-0 active:scale-95 transition-all">
                <div>
                  <Image
                    className="h-28 w-48 object-cover"
                    src={perk.imageUrl}
                    alt=""
                  />
                  <header className="p-2.5 w-48">
                    <p className="leading-tight break-words text-sm font-bold tracking-wide text-gray-700 mb-2">
                      {perk.label}
                    </p>
                    <p className="leading-tight break-words text-xs text-gray-400">
                      {perk.description}
                    </p>
                  </header>
                </div>
              </div>
            </label>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-end">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-6">
              <button
                className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                type="button"
                onClick={handleBackStep}
              >
                Back
              </button>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-6 ml-2">
              <button className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Publish
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

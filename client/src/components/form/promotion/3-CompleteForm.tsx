"use client";

import { DocumentType, useContractContext } from "@/context/contract";
import { usePackageFormContext } from "@/context/promotion/packageForm";
import { getWeb3Instance } from "@/lib/web3";
import { PromotionLetterType } from "@/models/package";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAutoFixHigh } from "react-icons/md";

interface FormValues {}

export const CompleteForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { onHandlePrev, formData, setStep, setFormData } =
    usePackageFormContext();
  const { address, addDocument } = useContractContext();

  const formDataJson = JSON.stringify(formData, null, 4);

  const { handleSubmit } = useForm<FormValues>({
    defaultValues: formData,
  });

  const handleFormSubmit = async (data: FormValues) => {
    try {
      if (!address) {
        console.error("Please connect to Metamask");
      }
      setIsLoading(true);
      const values = [
        formData.fullName,
        formData.position,
        formData.newPosition,
        formData.department,
        new Date(formData.effectiveDate).getTime(),
        formData.newSalary,
        formData.newResponsibilities,
        formData.supervisorName,
        formData.supervisorPosition,
        formData.companyName,
      ];

      const encodedData = getWeb3Instance().eth.abi.encodeParameters(
        PromotionLetterType,
        values
      );

      await addDocument(formData.address, encodedData, DocumentType.Promotion);

      setStep(1);
      setFormData({
        address: "",
        fullName: "",
        position: "",
        newPosition: "",
        department: "",
        effectiveDate: new Date(),
        newSalary: 0,
        newResponsibilities: "",
        supervisorName: "",
        supervisorPosition: "",
        companyName: "",
      });
      setIsLoading(false);
      router.push("/package/all?status=201");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        className="space-y-6"
        onSubmit={handleSubmit(handleFormSubmit)}
        autoComplete="off"
      >
        <div className="w-full mt-4 mb-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="px-4 py-2 bg-white rounded-t-lg">
            <label htmlFor="packageData" className="sr-only">
              Package Completion
            </label>
            <textarea
              id="packageData"
              rows={18}
              value={formDataJson}
              className="w-full px-0 text-sm font-semibold text-gray-900 bg-white border-0focus:ring-0"
              required
              disabled
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t">
            <button
              type="button"
              onClick={onHandlePrev}
              className="h-11 inline-flex items-center py-2.5 px-6 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            >
              Back
            </button>

            <button className="h-11 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
              Craft
              <span className="ml-3">
                <MdAutoFixHigh size={25} />
              </span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

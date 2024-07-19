"use client";

import React from "react";
import { Country } from "@/constants/enums/enums";
import { useForm } from "react-hook-form";
import { useFormState } from "@/components/form/PublishJobForm";

type TFormValues = {
  country: string;
  state: string;
  city: string;
  postal: string;
  addressLine1: string;
  addressLine2: string;
};

export function LocationForm() {
  const { handleNextStep, handleBackStep, setFormData, formData } =
    useFormState();
  const { register, handleSubmit } = useForm<TFormValues>({
    defaultValues: formData,
  });

  function handleFormSubmit(data: TFormValues) {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
    handleNextStep();
  }

  return (
    <>
      <form
        className="max-w-lg md:max-w-2xl mx-auto my-6"
        autoComplete="off"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="addressLine1"
            >
              Address Line 1 <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
              id="addressLine1"
              {...register("addressLine1")}
              placeholder="Enter an address"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="addressLine2"
            >
              Address Line 2
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
              id="addressLine2"
              {...register("addressLine2")}
              placeholder="Enter an address"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="city"
              >
                City <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                id="city"
                {...register("city")}
                placeholder="City"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-6 ml-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="state"
              >
                State <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                id="state"
                {...register("state")}
                placeholder="State"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-6 ml-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="postal"
              >
                Zip Code <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                id="postal"
                {...register("postal")}
                placeholder="Zip Code"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="country"
            >
              Country <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="country"
                {...register("country")}
              >
                {Object.entries(Country).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
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
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

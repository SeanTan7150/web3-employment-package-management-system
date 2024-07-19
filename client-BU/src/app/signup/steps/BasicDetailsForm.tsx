"use client";

import React, { useEffect, useState } from "react";
import {
  Tag,
  requirementsData as skillsData,
} from "@/constants/data/requirements.data";
import { useFormState } from "@/components/form/CreateUserForm";
import { useForm } from "react-hook-form";
import { Country } from "@/constants/enums/enums";
import { getWeb3Instance } from "@/constants/web3Providers";
import { useContractContext } from "@/constants/web3EthContract";

const MIN_SALARY = 2000;
const MAX_SALARY = 4000;

type TFormValues = {
  profileImageUrl: string;
  firstName: string;
  lastName: string;
  username: string;
  mobile: string;
  residency: string;
  email: string;
  resume: string;
  skills: string[];
  minExpectedMonthlySalary: number;
  maxExpectedMonthlySalary: number;
  bio: string;
};

export function BasicDetailsForm() {
  const { handleNextStep, setFormData, formData } = useFormState();
  const [salaryRange, setSalaryRange] = useState([MIN_SALARY, MAX_SALARY]);
  const [minimumSalary, setMinimumSalary] = useState(salaryRange[0]);
  const [maximumSalary, setMaximumSalary] = useState(salaryRange[0]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isUserCreated, setIsUserCreated] = useState(false);

  const { createUser } = useContractContext();

  const { register, handleSubmit } = useForm<TFormValues>({
    defaultValues: formData,
  });

  function handleFormSubmit(data: TFormValues) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...data,
      skills: selectedSkills,
      minExpectedMonthlySalary: minimumSalary,
      maxExpectedMonthlySalary: maximumSalary,
    }));
    setIsUserCreated(true);
  }

  useEffect(() => {
    if (isUserCreated) {
      const values = [
        formData.profileImageUrl,
        formData.firstName,
        formData.lastName,
        formData.username,
        formData.mobile,
        formData.residency,
        formData.email,
        formData.resume,
        formData.skills,
        formData.minExpectedMonthlySalary,
        formData.maxExpectedMonthlySalary,
        formData.bio,
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
        "string[]",
        "uint256",
        "uint256",
        "string",
      ];

      const encodedData = getWeb3Instance().eth.abi.encodeParameters(
        types,
        values
      );

      createUser(encodedData);
    }
  }, [isUserCreated]);

  return (
    <>
      <form
        className="max-w-lg md:max-w-2xl mx-auto my-6"
        autoComplete="off"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="firstName"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                id="firstName"
                {...register("firstName")}
                placeholder="John"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                id="lastName"
                {...register("lastName")}
                placeholder="Doe"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="username"
              >
                Username <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                id="username"
                {...register("username")}
                placeholder="johndoe"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="mobile"
              >
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                id="mobile"
                {...register("mobile")}
                placeholder="60123456789"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="residency"
            >
              Residency <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="residency"
                {...register("residency")}
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

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
              id="email"
              {...register("email")}
              placeholder="johndoe@mail.com"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-6">
            <button className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Signup
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

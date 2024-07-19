"use client";

import React, { useState } from "react";
import { Workplace, EmploymentType } from "@/constants/enums/enums";
import { useForm } from "react-hook-form";
import { useFormState } from "@/components/form/PublishJobForm";
import ReactSlider from "react-slider";
import { Tag, requirementsData } from "@/constants/data/requirements.data";
import Select, { ActionMeta, MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

const MIN_SALARY = 2000;
const MAX_SALARY = 4000;

type TFormValues = {
  title: string;
  workplace: string;
  employmentType: string;
  descriptionAbout: string;
  responsibilities: string;
  requirements: string[];
  minSalary: number;
  maxSalary: number;
};

export function BasicDetailsForm() {
  const { handleNextStep, setFormData, formData } = useFormState();
  const [salaryRange, setSalaryRange] = useState([MIN_SALARY, MAX_SALARY]);
  const [minimumSalary, setMinimumSalary] = useState(salaryRange[0]);
  const [maximumSalary, setMaximumSalary] = useState(salaryRange[0]);
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>(
    []
  );

  const { register, handleSubmit } = useForm<TFormValues>({
    defaultValues: formData,
  });

  const handleTagChange = (
    newValue: MultiValue<Tag>,
    actionMeta?: ActionMeta<Tag>
  ) => {
    const selectedTags = newValue.map((tag) => ({
      value: tag.value,
      label: tag.value,
    }));

    const selectedValues = newValue.map((tag) => tag.value);

    setSelectedTags(selectedTags);
    setSelectedRequirements(selectedValues);
  };

  function handleFormSubmit(data: TFormValues) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...data,
      requirements: selectedRequirements,
      minSalary: minimumSalary,
      maxSalary: maximumSalary,
    }));
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
              htmlFor="title"
            >
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
              id="title"
              {...register("title")}
              placeholder="Enter a job title"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="workplace"
            >
              Workplace <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="workplace"
                {...register("workplace")}
                required
              >
                {Object.entries(Workplace).map(([key, value]) => (
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
              htmlFor="employmentType"
            >
              Employment Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="employmentType"
                {...register("employmentType")}
                onChange={(e) => {
                  if (e.target.value === "Volunteer Work") {
                    setSalaryRange([0, 0]);
                    setIsVolunteer(true);
                  } else {
                    setSalaryRange([MIN_SALARY, MAX_SALARY]);
                    setIsVolunteer(false);
                  }
                }}
                required
              >
                {Object.entries(EmploymentType).map(([key, value]) => (
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
              htmlFor="descriptionAbout"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              rows={4}
              cols={50}
              id="descriptionAbout"
              {...register("descriptionAbout")}
              placeholder="What is this job about?"
              required
            ></textarea>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-6">
            <label
              className={`${
                isVolunteer ? "line-through" : ""
              } block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2`}
            >
              Monthly Salary Range <span className="text-red-500">*</span>
            </label>
            <div>
              <div
                className={`${
                  isVolunteer ? "text-red-600" : "text-blue-600"
                } text-sm font-bold`}
              >
                ${salaryRange[0]} - ${salaryRange[1]}
              </div>
            </div>
            <small>Current range: ${salaryRange[1] - salaryRange[0]}</small>

            <span className={`${isVolunteer ? "invisible" : ""}`}>
              <ReactSlider
                className={"slider"}
                onChange={(value) => {
                  setMinimumSalary(value[0]);
                  setMaximumSalary(value[1]);
                  setSalaryRange([value[0], value[1]]);
                }}
                value={[minimumSalary, salaryRange[1]]}
                min={300}
                max={30000}
                step={50}
                disabled={isVolunteer}
              />
            </span>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="responsibilities"
            >
              Responsibilities <span className="text-red-500">*</span>
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              rows={4}
              cols={50}
              id="responsibilities"
              {...register("responsibilities")}
              placeholder="What is their task?"
              required
            ></textarea>
          </div>
        </div>

        {/* <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="requirements"
            >
              Requirements <span className="text-red-500">*</span>
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              rows={4}
              cols={50}
              id="requirements"
              {...register("requirements")}
              placeholder="What is the required skills?"
              required
            ></textarea>
          </div>
        </div> */}

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="requirements"
            >
              Requirements <span className="text-red-500">*</span>
            </label>
            <CreatableSelect
              isMulti
              isClearable
              value={selectedTags}
              onChange={handleTagChange}
              options={requirementsData}
              placeholder="Add tags"
              menuPlacement="auto"
              required
            />
          </div>
        </div>

        <button className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Next
        </button>
      </form>
    </>
  );
}

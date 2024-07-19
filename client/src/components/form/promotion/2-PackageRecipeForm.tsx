"use client";

import { usePackageFormContext } from "@/context/promotion/packageForm";
import { HTMLInputTypeAttribute } from "react";
import { useForm, UseFormRegister } from "react-hook-form";

interface FormValues {
  newPosition: string;
  effectiveDate: Date;
  newSalary: number;
  newResponsibilities: string;
  supervisorName: string;
  supervisorPosition: string;
  companyName: string;
}

interface InputItemProps {
  label: string;
  type: HTMLInputTypeAttribute;
  id: string;
  placeholder: string;
  register: UseFormRegister<any>;
}

export const PackageRecipeForm = () => {
  const { onHandleNext, onHandlePrev, setFormData, formData } =
    usePackageFormContext();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: formData,
  });

  const handleFormSubmit = (data: FormValues) => {
    setFormData((prev) => ({ ...prev, ...data }));
    onHandleNext();
  };

  return (
    <>
      <form
        className="space-y-6"
        onSubmit={handleSubmit(handleFormSubmit)}
        autoComplete="off"
      >
        <InputItem
          label="New Position"
          type="text"
          id="newPosition"
          placeholder="HR Transformation Leader"
          register={register}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="effectiveDate">Effective Date</label>
          <input
            type="date"
            id="effectiveDate"
            className="h-11 px-4 border rounded-md"
            {...register("effectiveDate")}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="newSalary">New Salary</label>
          <input
            type="number"
            id="newSalary"
            className="h-11 px-4 border rounded-md"
            {...register("newSalary")}
            required
          />
        </div>

        <InputItem
          label="New Responsibilities"
          type="text"
          id="newResponsibilities"
          placeholder="Enjoy more coffee"
          register={register}
        />

        <InputItem
          label="Supervisor Name"
          type="text"
          id="supervisorName"
          placeholder="Jane Smith"
          register={register}
        />

        <InputItem
          label="Supervisor Position"
          type="text"
          id="supervisorPosition"
          placeholder="CEO"
          register={register}
        />

        <InputItem
          label="Company Name"
          type="text"
          id="companyName"
          placeholder="Ethiring"
          register={register}
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onHandlePrev}
            className="h-11 px-6 bg-black text-white rounded-md"
          >
            Back
          </button>

          <button className="h-11 px-6 bg-black text-white rounded-md">
            Next
          </button>
        </div>
      </form>
    </>
  );
};

const InputItem = ({
  label,
  type,
  id,
  placeholder,
  register,
}: InputItemProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="h-11 px-4 border rounded-md"
        {...register(id as any)}
        required
      />
    </div>
  );
};

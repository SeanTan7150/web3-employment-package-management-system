"use client";

import { usePackageFormContext } from "@/context/offer/packageForm";
import { HTMLInputTypeAttribute } from "react";
import { useForm, UseFormRegister } from "react-hook-form";

interface FormValues {
  responsibilities: string;
  workSchedule: string;
  startDate: Date;
  salary: number;
  benefits: string;
  supervisorName: string;
  supervisorPosition: string;
  companyName: string;
  offerExpiryDate: Date;
  employerContact: string;
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
          label="Responsibilities"
          type="text"
          id="responsibilities"
          placeholder="Enjoy coffee"
          register={register}
        />

        <InputItem
          label="Work Schedule"
          type="text"
          id="workSchedule"
          placeholder="9AM to 5PM, Monday to Friday"
          register={register}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            className="h-11 px-4 border rounded-md"
            {...register("startDate")}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            className="h-11 px-4 border rounded-md"
            {...register("salary")}
            required
          />
        </div>

        <InputItem
          label="Benefits"
          type="text"
          id="benefits"
          placeholder="Unlimited snacks to keep your belly happy!"
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

        <InputItem
          label="Employer Contact"
          type="text"
          id="employerContact"
          placeholder="+60123456789"
          register={register}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="offerExpiryDate">Offer Expiry Date</label>
          <input
            type="date"
            id="offerExpiryDate"
            className="h-11 px-4 border rounded-md"
            {...register("offerExpiryDate")}
            required
          />
        </div>

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

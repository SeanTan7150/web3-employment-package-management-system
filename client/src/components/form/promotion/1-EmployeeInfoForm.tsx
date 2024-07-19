"use client";

import { readUser, User } from "@/app/api/users/service";
import { usePackageFormContext } from "@/context/promotion/packageForm";
import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";

interface FormValues {
  address: string;
  fullName: string;
  position: string;
  department: string;
}

interface InputItemProps {
  label: string;
  type: HTMLInputTypeAttribute;
  id: string;
  placeholder: string;
  register: UseFormRegister<any>;
  disabled: boolean;
}

export const EmployeeInfoForm = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [employeeAddress, setEmployeeAddress] = useState("");
  const { onHandleNext, setFormData, formData } = usePackageFormContext();

  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: formData,
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUser = {
      address: event.target.value,
      fullName: event.target.options[event.target.selectedIndex].text,
    };
    setEmployeeAddress(event.target.value);
    setValue("address", selectedUser.address);
    setValue("fullName", selectedUser.fullName);
    setFormData((prev) => ({
      ...prev,
      address: selectedUser.address,
      fullName: selectedUser.fullName,
    }));
  };

  const handleFormSubmit = (data: FormValues) => {
    setFormData((prev) => ({ ...prev, ...data }));
    onHandleNext();
  };

  useEffect(() => {
    // setValue("address", "");
    setEmployeeAddress("");
    const fetchUsers = async () => {
      try {
        const response = await readUser();
        const user = Object.values(response);
        setUsers(user[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <form
        className="space-y-6"
        onSubmit={handleSubmit(handleFormSubmit)}
        autoComplete="off"
      >
        <div className="relative flex flex-col gap-1 mt-6">
          <select
            {...register("address", {
              onChange: handleChange,
            })}
            required
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          >
            <option value="">Pick</option>
            {users.map((user) => (
              <option
                key={user.auth}
                value={user.auth}
              >{`${user.first_name} ${user.last_name}`}</option>
            ))}
          </select>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Select Employee
          </label>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="address">Employee Address</label>
          <input
            type="text"
            id="address"
            value={employeeAddress}
            placeholder="0xethiring"
            className="h-11 px-4 border rounded-md"
            disabled
          />
        </div>

        {/* <InputItem
          label="Employee Address"
          type="text"
          id="address"
          placeholder="0xethiring"
          register={register}
          disabled={true}
        /> */}

        <InputItem
          label="Position"
          type="text"
          id="position"
          placeholder="HR Director"
          register={register}
          disabled={false}
        />

        <InputItem
          label="Department"
          type="text"
          id="department"
          placeholder="Human resources"
          register={register}
          disabled={false}
        />

        <div className="flex justify-end">
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
  disabled,
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
        disabled={disabled}
      />
    </div>
  );
};

"use client";

import React, { useState } from "react";

interface FormProps<T> {
  schema: T;
}

interface FieldConfig {
  type: string;
  label: string;
  placeholder: string;
  className: string;
}

const commonSchema = {
  address: "",
};

const formConfig: { [key: string]: FieldConfig } = {
  address: {
    type: "text",
    label: "Employee Address",
    placeholder: "0xethiring",
    className: "",
  },
  benefits: {
    type: "text",
    label: "Perks & Benefits",
    placeholder: "Unlimited snacks to keep your belly happy!",
    className: "h-11 px-4 border rounded-md",
  },
  companyName: {
    type: "text",
    label: "Company",
    placeholder: "Ethiring",
    className: "h-11 px-4 border rounded-md",
  },
  companyPropertyReturn: {
    type: "text",
    label: "Company Property Return",
    placeholder: "Magical office keys and cards",
    className: "h-11 px-4 border rounded-md",
  },
  department: {
    type: "text",
    label: "Department",
    placeholder: "Human Resource",
    className: "h-11 px-4 border rounded-md",
  },
  effectiveDate: {
    type: "date",
    label: "Effective Date",
    placeholder: "",
    className: "",
  },
  employerContact: {
    type: "text",
    label: "Employer Contact",
    placeholder: "hr@ethiring.com",
    className: "h-11 px-4 border rounded-md",
  },
  fullName: {
    type: "text",
    label: "Employee Full Name",
    placeholder: "John Doe",
    className: "h-11 px-4 border rounded-md",
  },
  lastWorkingDate: {
    type: "date",
    label: "Last Working Date",
    placeholder: "",
    className: "",
  },
  newPosition: {
    type: "text",
    label: "New Position",
    placeholder: "HR Transformation Leader",
    className: "h-11 px-4 border rounded-md",
  },
  newResponsibilities: {
    type: "text",
    label: "New Responsibilities",
    placeholder: "Enjoy more coffee",
    className: "h-11 px-4 border rounded-md",
  },
  newSalary: {
    type: "number",
    label: "New Salary",
    placeholder: "",
    className: "",
  },
  offerExpiryDate: {
    type: "date",
    label: "Offer Expiry Date",
    placeholder: "",
    className: "",
  },
  position: {
    type: "text",
    label: "Position",
    placeholder: "HR Director",
    className: "h-11 px-4 border rounded-md",
  },
  reason: {
    type: "text",
    label: "Reason",
    placeholder: "My dog ate my homework",
    className: "h-11 px-4 border rounded-md",
  },
  resignationDate: {
    type: "date",
    label: "Resignation Date",
    placeholder: "",
    className: "",
  },
  responsibilities: {
    type: "text",
    label: "Responsibilities",
    placeholder: "Enjoy coffee",
    className: "h-11 px-4 border rounded-md",
  },
  salary: {
    type: "number",
    label: "Salary",
    placeholder: "",
    className: "",
  },
  severanceDetails: {
    type: "text",
    label: "Severance Details",
    placeholder: "Your last paycheck, with all the trimmings",
    className: "h-11 px-4 border rounded-md",
  },
  startDate: {
    type: "date",
    label: "Start Date",
    placeholder: "",
    className: "",
  },
  supervisorName: {
    type: "text",
    label: "Supervisor Name",
    placeholder: "Jane Smith",
    className: "h-11 px-4 border rounded-md",
  },
  supervisorPosition: {
    type: "text",
    label: "Supervisor Position",
    placeholder: "CEO",
    className: "h-11 px-4 border rounded-md",
  },
  terminationDate: {
    type: "date",
    label: "Termination Date",
    placeholder: "",
    className: "",
  },
  workSchedule: {
    type: "text",
    label: "Work Schedule",
    placeholder: "9AM to 5PM, Monday to Friday",
    className: "h-11 px-4 border rounded-md",
  },
};

const DynamicForm = <T extends object>({ schema }: FormProps<T>) => {
  type SchemaWithAddress = T & { address: string };
  const mergedSchema: SchemaWithAddress = {
    ...schema,
    ...commonSchema,
  } as SchemaWithAddress;
  const [formState, setFormState] = useState<SchemaWithAddress>(mergedSchema);

  const fieldOrder = [
    "fullName",
    "address",
    ...Object.keys(schema).filter((key) => key !== "fullName"),
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted: ", formState);
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
        {fieldOrder.map((key) => {
          const config = formConfig[key];
          return (
            <>
              <div key={key} className="flex flex-col gap-1">
                <label htmlFor={key}>{config.label}</label>
                <input
                  type={config.type}
                  name={key}
                  id={key}
                  value={(formState as any)[key]}
                  placeholder={config.placeholder}
                  className={config.className}
                  onChange={handleChange}
                />
              </div>
            </>
          );
        })}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default DynamicForm;

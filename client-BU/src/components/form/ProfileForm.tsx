"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface FormData {
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
}

interface FormContextProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

const FormContext = createContext<FormContextProps>({
  formData: {
    profileImageUrl: "",
    firstName: "",
    lastName: "",
    username: "",
    mobile: "",
    residency: "Malaysia",
    email: "",
    resume: "",
    skills: [],
    minExpectedMonthlySalary: 0,
    maxExpectedMonthlySalary: 0,
    bio: "",
  },
  setFormData: () => {},
});

interface FormProps {
  children: ReactNode;
}

export function Form({ children }: FormProps) {
  const [formData, setFormData] = useState<FormData>({
    profileImageUrl: "",
    firstName: "",
    lastName: "",
    username: "",
    mobile: "",
    residency: "Malaysia",
    email: "",
    resume: "",
    skills: [],
    minExpectedMonthlySalary: 0,
    maxExpectedMonthlySalary: 0,
    bio: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormContext);
}

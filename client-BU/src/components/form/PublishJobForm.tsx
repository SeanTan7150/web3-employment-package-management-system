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
  // Basic Details
  title: string;
  workplace: string;
  employmentType: string;
  descriptionAbout: string;
  responsibilities: string;
  requirements: string[];
  minSalary: number;
  maxSalary: number;

  // Location
  country: string;
  state: string;
  city: string;
  postal: string;
  addressLine1: string;
  addressLine2: string;

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
}

interface FormContextProps {
  handleNextStep: () => void;
  handleBackStep: () => void;
  step: number;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

const FormContext = createContext<FormContextProps>({
  handleNextStep: () => {},
  handleBackStep: () => {},
  step: 1,
  formData: {
    // Basic Details
    title: "",
    workplace: "On-Site",
    employmentType: "Full-Time",
    descriptionAbout: "",
    responsibilities: "",
    requirements: [],
    minSalary: 1200,
    maxSalary: 2000,

    // Location
    country: "Malaysia",
    state: "",
    city: "",
    postal: "",
    addressLine1: "",
    addressLine2: "",

    // Benefits
    healthInsurance: false,
    retirementPlans: false,
    paidTimeOff: false,
    flexibleWorkSchedules: false,
    wellnessPrograms: false,
    lifeInsurance: false,
    disabilityInsurance: false,
    employeeAssistancePrograms: false,

    // Perks
    stockOptionsOrEquity: false,
    performanceBonuses: false,
    remoteWorkOpportunities: false,
    professionalDevelopmentAndTraining: false,
    companySponsoredEventsAndActivities: false,
    freeOrSubsidizedMealsSnacks: false,
    onSiteAmenities: false,
    transportationBenefits: false,
    employeeDiscounts: false,
    flexibleSpendingAccounts: false,
  },
  setFormData: () => {},
});

interface FormProps {
  children: ReactNode;
}

export function Form({ children }: FormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Basic Details
    title: "",
    workplace: "On-Site",
    employmentType: "Full-Time",
    descriptionAbout: "",
    responsibilities: "",
    requirements: [],
    minSalary: 1200,
    maxSalary: 2000,

    // Location
    country: "Malaysia",
    state: "",
    city: "",
    postal: "",
    addressLine1: "",
    addressLine2: "",

    // Benefits
    healthInsurance: false,
    retirementPlans: false,
    paidTimeOff: false,
    flexibleWorkSchedules: false,
    wellnessPrograms: false,
    lifeInsurance: false,
    disabilityInsurance: false,
    employeeAssistancePrograms: false,

    // Perks
    stockOptionsOrEquity: false,
    performanceBonuses: false,
    remoteWorkOpportunities: false,
    professionalDevelopmentAndTraining: false,
    companySponsoredEventsAndActivities: false,
    freeOrSubsidizedMealsSnacks: false,
    onSiteAmenities: false,
    transportationBenefits: false,
    employeeDiscounts: false,
    flexibleSpendingAccounts: false,
  });

  function handleNextStep() {
    setStep((prevValue) => prevValue + 1);
  }

  function handleBackStep() {
    setStep((prevValue) => prevValue - 1);
  }

  return (
    <>
      <FormContext.Provider
        value={{ handleNextStep, handleBackStep, step, formData, setFormData }}
      >
        {children}
      </FormContext.Provider>
    </>
  );
}

export function useFormState() {
  return useContext(FormContext);
}

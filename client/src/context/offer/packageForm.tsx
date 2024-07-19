import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface PackageFormContextProviderProps {
  children: ReactNode;
}

interface PackageFormContextProps {
  onHandleNext: () => void;
  onHandlePrev: () => void;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

interface FormData {
  address: string;
  fullName: string;
  position: string;
  department: string;
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

const PackageFormContext = createContext<PackageFormContextProps | undefined>(
  undefined
);

export const PackageFormContextProvider = ({
  children,
}: PackageFormContextProviderProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    address: "",
    fullName: "",
    position: "",
    department: "",
    responsibilities: "",
    workSchedule: "",
    startDate: new Date(),
    salary: 0,
    benefits: "",
    supervisorName: "",
    supervisorPosition: "",
    companyName: "",
    offerExpiryDate: new Date(),
    employerContact: "",
  });

  const onHandleNext = () => {
    setStep((prev) => prev + 1);
  };

  const onHandlePrev = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <PackageFormContext.Provider
      value={{
        onHandleNext,
        onHandlePrev,
        step,
        setStep,
        formData,
        setFormData,
      }}
    >
      {children}
    </PackageFormContext.Provider>
  );
};

export const usePackageFormContext = () => {
  const context = useContext(PackageFormContext);
  if (context === undefined) {
    throw new Error(
      "usePackageFormContext must be used within a PackageFormContextProvider"
    );
  }
  return context;
};

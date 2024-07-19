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
  newPosition: string;
  department: string;
  effectiveDate: Date;
  newSalary: number;
  newResponsibilities: string;
  supervisorName: string;
  supervisorPosition: string;
  companyName: string;
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
    newPosition: "",
    department: "",
    effectiveDate: new Date(),
    newSalary: 0,
    newResponsibilities: "",
    supervisorName: "",
    supervisorPosition: "",
    companyName: "",
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

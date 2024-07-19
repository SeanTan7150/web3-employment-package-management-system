import { useFormState } from "@/components/form/PublishJobForm";
import { BasicDetailsForm } from "./BasicDetailsForm";
import { LocationForm } from "./LocationForm";
import { BenefitsAndPerksForm } from "./BenefitsAndPerksForm";

export function Step() {
  const { step } = useFormState();

  switch (step) {
    case 1:
      return <BasicDetailsForm />;
    case 2:
      return <LocationForm />;
    case 3:
      return <BenefitsAndPerksForm />;
    default:
      return null;
  }
}

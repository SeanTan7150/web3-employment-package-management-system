import { useFormState } from "@/components/form/CreateUserForm";
import { BasicDetailsForm } from "./BasicDetailsForm";

export function Step() {
  const { step } = useFormState();

  switch (step) {
    case 1:
      return <BasicDetailsForm />;
    default:
      return null;
  }
}

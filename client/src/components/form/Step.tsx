import { usePackageFormContext as useOfferLetterContext } from "@/context/offer/packageForm";
import { usePackageFormContext as usePromotionLetterContext } from "@/context/promotion/packageForm";
import { EmployeeInfoForm as OfferLetterEmployeeInfoForm } from "./offer/1-EmployeeInfoForm";
import { PackageRecipeForm as OfferLetterPackageRecipeForm } from "./offer/2-PackageRecipeForm";
import { CompleteForm as OfferLetterCompleteForm } from "./offer/3-CompleteForm";
import { EmployeeInfoForm as PromotionLetterEmployeeInfoForm } from "./promotion/1-EmployeeInfoForm";
import { PackageRecipeForm as PromotionLetterPackageRecipeForm } from "./promotion/2-PackageRecipeForm";
import { CompleteForm as PromotionLetterCompleteForm } from "./promotion/3-CompleteForm";

interface StepProps {
  type: string;
}

export const Step = ({ type }: StepProps) => {
  switch (type) {
    case "offer":
      const offerContext = useOfferLetterContext();
      const offerStep = offerContext.step;
      switch (offerStep) {
        case 1:
          return <OfferLetterEmployeeInfoForm />;
        case 2:
          return <OfferLetterPackageRecipeForm />;
        case 3:
          return <OfferLetterCompleteForm />;
        default:
          return null;
      }
    case "promotion":
      const promotionContext = usePromotionLetterContext();
      const promotionStep = promotionContext.step;
      switch (promotionStep) {
        case 1:
          return <PromotionLetterEmployeeInfoForm />;
        case 2:
          return <PromotionLetterPackageRecipeForm />;
        case 3:
          return <PromotionLetterCompleteForm />;
        default:
          return null;
      }
    default:
      return null;
  }
};

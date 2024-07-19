export interface JobData {
  title: string;
  workplace: string;
  country: string;
  state: string;
  city: string;
  postal: string;
  addressLine1: string;
  addressLine2?: string;
  employmentType: string;
  descriptionAbout: string;
  responsibilities: string[];
  requirements: string[];
  minSalary: number;
  maxSalary: number;
  healthInsurance: boolean;
  retirementPlans: boolean;
  paidTimeOff: boolean;
  flexibleWorkSchedules: boolean;
  wellnessPrograms: boolean;
  lifeInsurance: boolean;
  disabilityInsurance: boolean;
  employeeAssistancePrograms: boolean;
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

export const jobDataTypes = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string[]",
  "uint256",
  "uint256",
  "bool",
  "bool",
  "bool",
  "bool",
  "bool",
  "bool",
  "bool",
  "bool",
  "bool",
  "bool",
  "bool",
  "bool",
  "bool",
  "bool",
  "bool",
  "bool",
  "bool",
  "bool",
];

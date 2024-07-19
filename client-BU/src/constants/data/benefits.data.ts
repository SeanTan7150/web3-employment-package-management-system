import {
  healthInsurance,
  retirementPlans,
  paidTimeOff,
  flexibleWorkSchedules,
  wellnessPrograms,
  lifeInsurance,
  disabilityInsurance,
  employeeAssistancePrograms,
} from "../../../public/PerksAndBenefits/images";

const benefitsData = [
  {
    id: "healthInsurance",
    label: "Health Insurance",
    description: "Coverage for medical expenses incurred",
    imageUrl: healthInsurance,
  },
  {
    id: "retirementPlans",
    label: "Retirement Plans",
    description: "Savings for post-work life",
    imageUrl: retirementPlans,
  },
  {
    id: "paidTimeOff",
    label: "Paid Time Off",
    description: "Time off with full pay",
    imageUrl: paidTimeOff,
  },
  {
    id: "flexibleWorkSchedules",
    label: "Flexible Work Schedules",
    description: "Adaptable hours for work-life balance",
    imageUrl: flexibleWorkSchedules,
  },
  {
    id: "wellnessPrograms",
    label: "Wellness Programs",
    description: "Promotes employee health and wellness",
    imageUrl: wellnessPrograms,
  },
  {
    id: "lifeInsurance",
    label: "Life Insurance",
    description: "Financial protection assurance",
    imageUrl: lifeInsurance,
  },
  {
    id: "disabilityInsurance",
    label: "Disability Insurancee",
    description: "Financial security during incapacitation",
    imageUrl: disabilityInsurance,
  },
  {
    id: "employeeAssistancePrograms",
    label: "Employee Assistance Programs",
    description: "Supportive counseling for employee well-being",
    imageUrl: employeeAssistancePrograms,
  },
];

export default benefitsData;

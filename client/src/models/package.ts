export type OfferLetter = {
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
};

export type PromotionLetter = {
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
};

// signed by HR
export type ResignationLetter = {
  fullName: string;
  position: string;
  department: string;
  resignationDate: Date;
  lastWorkingDate: Date;
  reason: string;
  employerContact: string;
};

export type TerminationLetter = {
  fullName: string;
  position: string;
  department: string;
  terminationDate: Date;
  reason: string;
  severanceDetails: string;
  companyPropertyReturn: string;
  employerContact: string;
};

export type ContractRenewalLetter = {
  employee_full_name: string;
  current_position: string;
  department: string;
  renewal_start_date: Date;
  renewal_end_date: Date;
  new_salary: number;
  new_benefits: string;
  supervisor_name: string;
  supervisor_position: string;
  company_name: string;
};

export type SalaryIncreaseLetter = {
  employee_full_name: string;
  current_position: string;
  department: string;
  current_salary: number;
  new_salary: number;
  effective_date: Date;
  reason: string;
  supervisor_name: string;
  supervisor_position: string;
  company_name: string;
};

export type BonusLetter = {
  employee_full_name: string;
  current_position: string;
  department: string;
  bonus_amount: number;
  reason: string;
  supervisor_name: string;
  supervisor_position: string;
  company_name: string;
};

export type TransferLetter = {
  employee_full_name: string;
  current_position: string;
  current_department: string;
  new_position: string;
  new_department: string;
  effective_date: Date;
  reason: string;
  supervisor_name: string;
  supervisor_position: string;
  company_name: string;
};

export type WarningLetter = {
  employee_full_name: string;
  current_position: string;
  department: string;
  issue_date: Date;
  issue_description: string;
  previous_warnings: string;
  expected_improvements: string;
  non_improvement_consequences: string;
  supervisor_name: string;
  supervisor_position: string;
  company_name: string;
};

export type EmploymentVerificationLetter = {
  employee_full_name: string;
  current_position: string;
  department: string;
  start_date: Date;
  employment_status: string;
  salary: number;
  employment_end_date?: Date; // optional
  supervisor_name: string;
  supervisor_position: string;
  company_name: string;
  employer_contact: string;
};

export type JobDescriptionLetter = {
  employee_full_name: string;
  current_position: string;
  department: string;
  start_date: Date;
  responsibilities: string;
  work_schedule: string;
  reporting_structure: string;
  performance_expectations: string;
  supervisor_name: string;
  supervisor_position: string;
  company_name: string;
};

export type TrainingCompletionLetter = {
  employee_full_name: string;
  current_position: string;
  department: string;
  training_program: string;
  completion_date: Date;
  supervisor_name: string;
  supervisor_position: string;
  company_name: string;
};

export type ProbationPeriodCompletionLetter = {
  employee_full_name: string;
  current_position: string;
  department: string;
  probation_end_date: Date;
  performance_summary: string;
  employment_confirmation: string;
  supervisor_name: string;
  supervisor_position: string;
  company_name: string;
};

export type LeaveApprovalLetter = {
  employee_full_name: string;
  current_position: string;
  department: string;
  leave_start_date: Date;
  leave_end_date: Date;
  leave_type: string;
  supervisor_name: string;
  supervisor_position: string;
  company_name: string;
};

export type ReferenceLetter = {
  employee_full_name: string;
  current_position: string;
  department: string;
  employment_start_date: Date;
  employment_end_date: Date;
  skills: string;
  supervisor_name: string;
  supervisor_position: string;
  employer_contact: string;
  company_name: string;
};

export type RelocationLetter = {
  employee_full_name: string;
  current_position: string;
  department: string;
  new_location: string;
  new_position: string;
  effective_date: Date;
  relocation_assistance_details: string;
  supervisor_name: string;
  supervisor_position: string;
  company_name: string;
};

// signed by HR
export type RetirementLetter = {
  employee_full_name: string;
  current_position: string;
  department: string;
  retirement_date: Date;
  retirement_benefits: string;
  supervisor_name: string;
  supervisor_position: string;
  company_name: string;
};

export type EndOfContractLetter = {
  employee_full_name: string;
  current_position: string;
  department: string;
  contract_end_date: Date;
  reason: string;
  supervisor_name: string;
  supervisor_position: string;
  company_name: string;
};

export type ChangeInEmploymentTermsLetter = {
  employee_full_name: string;
  current_position: string;
  department: string;
  effective_date: Date;
  new_terms: string;
  reason: string;
  supervisor_name: string;
  supervisor_position: string;
  company_name: string;
};

export const OfferLetterType = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "uint256",
  "uint256",
  "string",
  "string",
  "string",
  "string",
  "uint256",
  "string",
];

export const PromotionLetterType = [
  "string",
  "string",
  "string",
  "string",
  "uint256",
  "uint256",
  "string",
  "string",
  "string",
  "string",
];

export const ResignationLetterType = [
  "string",
  "string",
  "string",
  "uint256",
  "uint256",
  "string",
  "string",
];

export const TerminationLetterType = [
  "string",
  "string",
  "string",
  "uint256",
  "string",
  "string",
  "string",
  "string",
];

export const ContractRenewalLetterType = [
  "string",
  "string",
  "string",
  "uint256",
  "uint256",
  "uint256",
  "string",
  "string",
  "string",
  "string",
];

export const SalaryIncreaseLetterType = [
  "string",
  "string",
  "string",
  "uint256",
  "uint256",
  "uint256",
  "string",
  "string",
  "string",
  "string",
];

export const BonusLetterType = [
  "string",
  "string",
  "string",
  "uint256",
  "string",
  "string",
  "string",
  "string",
];

export const TransferLetterType = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "uint256",
  "string",
  "string",
  "string",
  "string",
];

export const WarningLetterType = [
  "string",
  "string",
  "string",
  "uint256",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
];

export const EmploymentVerificationLetterType = [
  "string",
  "string",
  "string",
  "uint256",
  "string",
  "uint256",
  "uint256?",
  "string",
  "string",
  "string",
  "string",
];

export const JobDescriptionLetterType = [
  "string",
  "string",
  "string",
  "uint256",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
];

export const TrainingCompletionLetterType = [
  "string",
  "string",
  "string",
  "string",
  "uint256",
  "string",
  "string",
  "string",
];

export const ProbationPeriodCompletionLetterType = [
  "string",
  "string",
  "string",
  "uint256",
  "string",
  "string",
  "string",
  "string",
  "string",
];

export const LeaveApprovalLetterType = [
  "string",
  "string",
  "string",
  "uint256",
  "uint256",
  "string",
  "string",
  "string",
  "string",
];

export const ReferenceLetterType = [
  "string",
  "string",
  "string",
  "uint256",
  "uint256",
  "string",
  "string",
  "string",
  "string",
  "string",
];

export const RelocationLetterType = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "uint256",
  "string",
  "string",
  "string",
  "string",
];

export const RetirementLetterType = [
  "string",
  "string",
  "string",
  "uint256",
  "string",
  "string",
  "string",
  "string",
];

export const EndOfContractLetterType = [
  "string",
  "string",
  "string",
  "uint256",
  "string",
  "string",
  "string",
  "string",
];

export const ChangeInEmploymentTermsLetterType = [
  "string",
  "string",
  "string",
  "uint256",
  "string",
  "string",
  "string",
  "string",
  "string",
];

type DocumentTypeMapping = {
  [key: number]: string[];
};

export const documentTypeMapping: DocumentTypeMapping = {
  0: OfferLetterType,
  1: PromotionLetterType,
  2: ResignationLetterType,
  3: TerminationLetterType,
  4: ContractRenewalLetterType,
  5: SalaryIncreaseLetterType,
  6: BonusLetterType,
  7: TransferLetterType,
  8: WarningLetterType,
  9: EmploymentVerificationLetterType,
  10: JobDescriptionLetterType,
  11: TrainingCompletionLetterType,
  12: ProbationPeriodCompletionLetterType,
  13: LeaveApprovalLetterType,
  14: ReferenceLetterType,
  15: RelocationLetterType,
  16: RetirementLetterType,
  17: EndOfContractLetterType,
  18: ChangeInEmploymentTermsLetterType,
};

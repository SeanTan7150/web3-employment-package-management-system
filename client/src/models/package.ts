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
  expiry: Date;
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
  expiry: Date;
};

// signed by HR
export type ResignationLetter = {
  fullName: string;
  position: string;
  department: string;
  resignationDate: Date;
  lastWorkingDate: Date;
  reason: string;
  expiry: Date;
};

export type TerminationLetter = {
  fullName: string;
  position: string;
  department: string;
  terminationDate: Date;
  reason: string;
  severanceDetails: string;
  companyPropertyReturn: string;
  expiry: Date;
};

export type ContractRenewalLetter = {
  fullName: string;
  position: string;
  department: string;
  renewalStartDate: Date;
  renewalEndDate: Date;
  newSalary: number;
  newBenefits: string;
  supervisorName: string;
  expiry: Date;
};

export type SalaryIncreaseLetter = {
  fullName: string;
  position: string;
  department: string;
  currentSalary: number;
  newSalary: number;
  effectiveDate: Date;
  reason: string;
  supervisorName: string;
  expiry: Date;
};

export type BonusLetter = {
  fullName: string;
  position: string;
  department: string;
  bonusAmount: number;
  reason: string;
  supervisorName: string;
  expiry: Date;
};

export type TransferLetter = {
  fullName: string;
  position: string;
  department: string;
  newPosition: string;
  newDepartment: string;
  effectiveDate: Date;
  reason: string;
  supervisorName: string;
  expiry: Date;
};

export type WarningLetter = {
  fullName: string;
  position: string;
  department: string;
  issueDate: Date;
  issueDescription: string;
  previousWarnings: string;
  expectedImprovements: string;
  nonImprovementConsequences: string;
  supervisorName: string;
  expiry: Date;
};

export type EmploymentVerificationLetter = {
  fullName: string;
  position: string;
  department: string;
  startDate: Date;
  employmentStatus: string;
  salary: number;
  employmentEndDate: Date;
  supervisorName: string;
  expiry: Date;
};

export type JobDescriptionLetter = {
  fullName: string;
  position: string;
  department: string;
  startDate: Date;
  responsibilities: string;
  workSchedule: string;
  performanceExpectations: string;
  supervisorName: string;
  expiry: Date;
};

export type TrainingCompletionLetter = {
  fullName: string;
  position: string;
  department: string;
  trainingProgram: string;
  completionDate: Date;
  supervisorName: string;
  expiry: Date;
};

export type ProbationPeriodCompletionLetter = {
  fullName: string;
  position: string;
  department: string;
  probationEndDate: Date;
  performanceSummary: string;
  employmentConfirmation: string;
  supervisorName: string;
  expiry: Date;
};

export type LeaveApprovalLetter = {
  fullName: string;
  position: string;
  department: string;
  leaveStartDate: Date;
  leaveEndDate: Date;
  leaveType: string;
  supervisorName: string;
  expiry: Date;
};

export type ReferenceLetter = {
  fullName: string;
  position: string;
  department: string;
  employmentStartDate: Date;
  employmentEndDate: Date;
  skills: string;
  supervisorName: string;
  expiry: Date;
};

export type RelocationLetter = {
  fullName: string;
  position: string;
  department: string;
  newLocation: string;
  newPosition: string;
  effectiveDate: Date;
  relocationAssistanceDetails: string;
  supervisorName: string;
  expiry: Date;
};

// signed by HR
export type RetirementLetter = {
  fullName: string;
  position: string;
  department: string;
  retirementDate: Date;
  retirementBenefits: string;
  supervisorName: string;
  expiry: Date;
};

export type EndOfContractLetter = {
  fullName: string;
  position: string;
  department: string;
  contractEndDate: Date;
  reason: string;
  supervisorName: string;
  expiry: Date;
};

export type ChangeInEmploymentTermsLetter = {
  fullName: string;
  position: string;
  department: string;
  effectiveDate: Date;
  newTerms: string;
  reason: string;
  supervisorName: string;
  expiry: Date;
};

export const packageMap: { [key in number]: string } = {
  0: "Offer Letter",
  1: "Promotion Letter",
  2: "Resignation Letter",
  3: "Termination Letter",
  4: "Contract Renewal Letter",
  5: "Salary Increase Letter",
  6: "Bonus Letter",
  7: "Transfer Letter",
  8: "Warning Letter",
  9: "Employment Verification Letter",
  10: "Job Description Letter",
  11: "Training Completion Letter",
  12: "Probation Period Completion Letter",
  13: "Leave Approval Letter",
  14: "Reference Letter",
  15: "Relocation Letter",
  16: "Retirement Letter",
  17: "End of Contract Letter",
  18: "Change in Employment Terms Letter",
};

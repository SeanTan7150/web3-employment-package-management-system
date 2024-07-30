export interface Package {
  path: string;
  title: string;
  description: string;
}

export const EMPLOYER_PACKAGES: Package[] = [
  {
    path: "/ethiring/package/add/offer",
    title: "Offer",
    description:
      "Congratulations! An exciting job offer is extended. Welcome aboard!",
  },
  {
    path: "/ethiring/package/add/promotion",
    title: "Promotion",
    description: "Pleased to announce a promotion. New responsibilities await!",
  },
  {
    path: "/ethiring/package/add/termination",
    title: "Termination",
    description:
      "Regretfully, employment is terminated. Best wishes for future endeavors.",
  },
  {
    path: "/ethiring/package/add/contract_renewal",
    title: "Contract Renewal",
    description: "Good news! Contract has been renewed for another term.",
  },
  {
    path: "/ethiring/package/add/salary_increase",
    title: "Salary Increase",
    description: "Great news! Salary increase approved for the role.",
  },
  {
    path: "/ethiring/package/add/bonus",
    title: "Bonus",
    description:
      "Enjoy this bonus! Extra rewards earned for outstanding performance.",
  },
  {
    path: "/ethiring/package/add/transfer",
    title: "Transfer",
    description: "Transfer to a new department or role has been arranged.",
  },
  {
    path: "/ethiring/package/add/warning",
    title: "Warning",
    description:
      "This is a performance warning. Immediate improvement is necessary.",
  },
  {
    path: "/ethiring/package/add/employment_verification",
    title: "Employment Verification",
    description: "Providing employment verification for proof of job status.",
  },
  {
    path: "/ethiring/package/add/job_description",
    title: "Job Description",
    description:
      "Detailed job description outlining role and responsibilities.",
  },
  {
    path: "/ethiring/package/add/training_completion",
    title: "Training Completion",
    description:
      "Congratulations on successfully completing the training program!",
  },
  {
    path: "/ethiring/package/add/probation_period_completion",
    title: "Probation Period Completion",
    description:
      "Congratulations on completing the probation period. Welcome aboard!",
  },
  {
    path: "/ethiring/package/add/leave_approval",
    title: "Leave Approval",
    description: "Leave request approved. Enjoy the time off!",
  },
  {
    path: "/ethiring/package/add/reference",
    title: "Reference",
    description: "Providing a reference for the next career opportunity.",
  },
  {
    path: "/ethiring/package/add/relocation",
    title: "Relocation",
    description: "Relocation to a new place arranged. Best of luck!",
  },
  {
    path: "/ethiring/package/add/end_of_contract",
    title: "End of Contract",
    description: "Contract has ended. Thank you for valuable contributions!",
  },
  {
    path: "/ethiring/package/add/change_in_employment_terms",
    title: "Change in Employment Terms",
    description:
      "Notice of changes in employment terms. Please review and acknowledge.",
  },
];

export const EMPLOYEE_PACKAGES: Package[] = [
  {
    path: "/ethiring/package/add/resignation",
    title: "Resignation",
    description:
      "Time to say goodbye! This is a resignation letter with an exit plan.",
  },
  {
    path: "/ethiring/package/add/retirement",
    title: "Retirement",
    description: "Happy retirement! Time to relax and enjoy life after work.",
  },
];

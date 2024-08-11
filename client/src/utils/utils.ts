import { DocumentType, EmploymentDocument } from "@/context/contract";
import {
  BonusLetter,
  ChangeInEmploymentTermsLetter,
  ContractRenewalLetter,
  EmploymentVerificationLetter,
  EndOfContractLetter,
  JobDescriptionLetter,
  LeaveApprovalLetter,
  OfferLetter,
  ProbationPeriodCompletionLetter,
  PromotionLetter,
  ReferenceLetter,
  RelocationLetter,
  ResignationLetter,
  RetirementLetter,
  SalaryIncreaseLetter,
  TerminationLetter,
  TrainingCompletionLetter,
  TransferLetter,
  WarningLetter,
} from "@/models/package";
import jsPDF from "jspdf";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { User } from "@/models/user";

ChartJS.register(ArcElement, Tooltip, Legend);

export const generateOfferLetter = async (
  offerLetter: OfferLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();
  // prepare responsibilities array
  const responsibilities = offerLetter.responsibilities
    .split(".")
    .filter(Boolean);

  //prepare benefits array
  const benefits = offerLetter.benefits.split(".").filter(Boolean);

  let row = 20;

  doc.setFontSize(18);
  doc.text("Offer Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To the attention of ${offerLetter.fullName}, `, 10, row);
  row += 10;
  doc.text(
    `Ethiring Sdn. Bhd. (the "Employer") is pleased to offer you the position of ${offerLetter.position}. We are confident that you will find this new opportunity challenging and that you will make a significant contribution to the success of our company. The conditions of our offer are as follows:`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(
    `1. The Employer offers you a full-time position starting from ${offerLetter.startDate} at Level 20, Tower B, The Vertical Business Suite, Avenue 3, Bangsar South, No. 8, Jalan Kerinchi, 59200 Kuala Lumpur, Malaysia`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(
    `2. In this role, you wil be reporting to ${offerLetter.supervisorName}. `,
    10,
    row
  );
  row += 10;
  doc.text(`3. In this role, you wil be required to: `, 10, row);
  row += 10;
  for (const responsibility of responsibilities) {
    const wrappedText = doc.splitTextToSize(`* ${responsibility}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 5;
  doc.text(
    `4. You will be expected to adhere to the following work schedule: `,
    10,
    row
  );
  row += 10;
  doc.text(`${offerLetter.workSchedule}`, 10, row);
  row += 10;
  doc.text(
    `5. The annual starting salary for this position is RM${offerLetter.salary} to be paid every month.`,
    10,
    row,
    { maxWidth: 190 }
  );
  row += 10;
  doc.text(
    `6. In addition, we are offering you the following compensation: `,
    10,
    row
  );
  row += 10;
  for (const benefit of benefits) {
    const wrappedText = doc.splitTextToSize(`* ${benefit}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  doc.text(`7. The offer is valid until ${offerLetter.expiry}.`, 10, row);
  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generatePromotionLetter = async (
  promotionLetter: PromotionLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();
  // Prepare new responsibilities array
  const responsibilities = promotionLetter.newResponsibilities
    .split(".")
    .filter(Boolean);

  let row = 20;

  doc.setFontSize(18);
  doc.text("Promotion Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To the attention of ${promotionLetter.fullName}, `, 10, row);
  row += 10;
  doc.text(
    `We are pleased to inform you that you have been promoted to the position of ${promotionLetter.newPosition} within the ${promotionLetter.department} department. This promotion is effective from ${promotionLetter.effectiveDate}. The details of your new position are as follows:`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(`1. Your new position is ${promotionLetter.newPosition}.`, 10, row);
  row += 10;
  doc.text(
    `2. Your new salary will be RM${promotionLetter.newSalary} per annum.`,
    10,
    row
  );
  row += 10;
  doc.text(
    `3. In this role, you will be reporting to ${promotionLetter.supervisorName}.`,
    10,
    row
  );
  row += 10;
  doc.text(`4. You will be required to:`, 10, row);
  row += 10;
  for (const responsibility of responsibilities) {
    const wrappedText = doc.splitTextToSize(`* ${responsibility}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 5;
  doc.text(
    `5. This promotion is valid until ${promotionLetter.expiry}.`,
    10,
    row
  );

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateResignationLetter = async (
  resignationLetter: ResignationLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  // Prepare reason array
  const reason = resignationLetter.reason.split(".").filter(Boolean);

  let row = 20;

  doc.setFontSize(18);
  doc.text("Resignation Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To the attention of HR, `, 10, row);
  row += 10;
  doc.text(
    `I, ${resignationLetter.fullName}, currently holding the position of ${resignationLetter.position} in the ${resignationLetter.department} department, hereby formally submit my resignation from my position. This resignation will be effective from ${resignationLetter.resignationDate}. My last working day will be ${resignationLetter.lastWorkingDate}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(`The reason for my resignation is as follows:`, 10, row);
  row += 10;
  for (const reasonItem of reason) {
    const wrappedText = doc.splitTextToSize(`* ${reasonItem}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 5;
  doc.text(
    `I appreciate the opportunities for professional development that I have received during my tenure. Please let me know how I can assist during the transition period. This resignation is valid until ${resignationLetter.expiry}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateTerminationLetter = async (
  terminationLetter: TerminationLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  // Prepare reason array
  const reason = terminationLetter.reason.split(".").filter(Boolean);

  // Prepare severance details array
  const severanceDetails = terminationLetter.severanceDetails
    .split(".")
    .filter(Boolean);

  let row = 20;

  doc.setFontSize(18);
  doc.text("Termination Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To the attention of ${terminationLetter.fullName}, `, 10, row);
  row += 10;
  doc.text(
    `We regret to inform you that your employment with ${terminationLetter.department} as ${terminationLetter.position} will be terminated effective from ${terminationLetter.terminationDate}. This decision has been made based on the following reason(s):`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;

  for (const reasonItem of reason) {
    const wrappedText = doc.splitTextToSize(`* ${reasonItem}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }

  row += 10;
  doc.text(
    `Please be advised of the following details regarding your termination:`,
    10,
    row
  );
  row += 10;

  doc.text(`1. Severance Details:`, 10, row);
  row += 10;
  for (const detail of severanceDetails) {
    const wrappedText = doc.splitTextToSize(`* ${detail}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }

  row += 10;
  doc.text(
    `2. Return of Company Property: ${terminationLetter.companyPropertyReturn}`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 10;

  doc.text(
    `This letter serves as formal notice of the termination of your employment, effective until ${terminationLetter.expiry}. Please ensure that all company property is returned and all outstanding matters are settled before your departure.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateContractRenewalLetter = async (
  contractRenewalLetter: ContractRenewalLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  // Prepare new benefits array
  const newBenefits = contractRenewalLetter.newBenefits
    .split(".")
    .filter(Boolean);

  let row = 20;

  doc.setFontSize(18);
  doc.text("Contract Renewal Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To the attention of ${contractRenewalLetter.fullName}, `, 10, row);
  row += 10;
  doc.text(
    `We are pleased to inform you that your contract with Ethiring Sdn. Bhd. is being renewed. Below are the details of the renewal:`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(
    `1. Your position: ${contractRenewalLetter.position} in the ${contractRenewalLetter.department} department.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 10;
  doc.text(
    `2. The renewal period will start from ${contractRenewalLetter.renewalStartDate} and end on ${contractRenewalLetter.renewalEndDate}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(
    `3. Your new annual salary will be RM${contractRenewalLetter.newSalary}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 10;
  doc.text(
    `4. In addition, the following new benefits will be provided:`,
    10,
    row
  );
  row += 10;
  for (const benefit of newBenefits) {
    const wrappedText = doc.splitTextToSize(`* ${benefit}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 10;
  doc.text(
    `5. Your supervisor will continue to be ${contractRenewalLetter.supervisorName}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 10;
  doc.text(
    `6. This renewal letter is valid until ${contractRenewalLetter.expiry}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateSalaryIncreaseLetter = async (
  salaryIncreaseLetter: SalaryIncreaseLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  // Prepare reason array
  const reason = salaryIncreaseLetter.reason.split(".").filter(Boolean);

  let row = 20;

  doc.setFontSize(18);
  doc.text("Salary Increase Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To the attention of ${salaryIncreaseLetter.fullName},`, 10, row);
  row += 10;
  doc.text(
    `We are pleased to inform you that, effective ${salaryIncreaseLetter.effectiveDate}, your salary will be increased from RM${salaryIncreaseLetter.currentSalary} to RM${salaryIncreaseLetter.newSalary}. This decision reflects your outstanding performance and significant contributions to the ${salaryIncreaseLetter.department} department in your role as ${salaryIncreaseLetter.position}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 40;
  doc.text(`The reason for this salary increase is as follows:`, 10, row);
  row += 10;
  for (const reasonItem of reason) {
    const wrappedText = doc.splitTextToSize(`* ${reasonItem}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 10;
  doc.text(
    `We appreciate your dedication and hard work. We are confident that you will continue to excel in your role under the supervision of ${salaryIncreaseLetter.supervisorName}. Please feel free to reach out if you have any questions regarding this adjustment.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(
    `This offer is valid until ${salaryIncreaseLetter.expiry}.`,
    10,
    row
  );

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateBonusLetter = async (
  bonusLetter: BonusLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  // Prepare reason array
  const reason = bonusLetter.reason.split(".").filter(Boolean);

  let row = 20;

  doc.setFontSize(18);
  doc.text("Bonus Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To the attention of ${bonusLetter.fullName}, `, 10, row);
  row += 10;
  doc.text(
    `We are pleased to inform you that you have been awarded a bonus for your exceptional performance and contributions to the ${bonusLetter.department} department as a ${bonusLetter.position}. The details of the bonus are as follows:`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(`1. Bonus Amount: RM${bonusLetter.bonusAmount}`, 10, row);
  row += 10;
  doc.text(`2. Reason for Bonus:`, 10, row);
  row += 10;
  for (const reasonItem of reason) {
    const wrappedText = doc.splitTextToSize(`* ${reasonItem}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 5;
  doc.text(
    `This bonus is a token of our appreciation for your hard work and dedication. We look forward to your continued contributions and success at our company.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(
    `This letter is valid until ${bonusLetter.expiry}. Please do not hesitate to contact ${bonusLetter.supervisorName} if you have any questions or require further clarification.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateTransferLetter = async (
  transferLetter: TransferLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  // Prepare reason array
  const reason = transferLetter.reason.split(".").filter(Boolean);

  let row = 20;

  doc.setFontSize(18);
  doc.text("Transfer Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To the attention of ${transferLetter.fullName},`, 10, row);
  row += 10;
  doc.text(
    `Ethiring Sdn. Bhd. (the "Employer") is pleased to inform you that you are being transferred to a new position. The details of your transfer are as follows:`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(`1. Current Position: ${transferLetter.position}`, 10, row, {
    maxWidth: 190,
    align: "justify",
  });
  row += 10;
  doc.text(`2. Current Department: ${transferLetter.department}`, 10, row, {
    maxWidth: 190,
    align: "justify",
  });
  row += 10;
  doc.text(`3. New Position: ${transferLetter.newPosition}`, 10, row, {
    maxWidth: 190,
    align: "justify",
  });
  row += 10;
  doc.text(`4. New Department: ${transferLetter.newDepartment}`, 10, row, {
    maxWidth: 190,
    align: "justify",
  });
  row += 10;
  doc.text(`5. Effective Date: ${transferLetter.effectiveDate}`, 10, row, {
    maxWidth: 190,
    align: "justify",
  });
  row += 10;
  doc.text(`6. Reason for Transfer:`, 10, row);
  row += 10;
  for (const reasonItem of reason) {
    const wrappedText = doc.splitTextToSize(`* ${reasonItem}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 5;
  doc.text(
    `You will be reporting to ${transferLetter.supervisorName} in your new role. We believe this transfer will provide you with new opportunities for professional growth and development.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(
    `Please confirm your acceptance of this transfer by signing and returning a copy of this letter by ${transferLetter.expiry}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateWarningLetter = async (
  warningLetter: WarningLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  // Prepare text arrays
  const issueDescription = warningLetter.issueDescription
    .split(".")
    .filter(Boolean);
  const previousWarnings = warningLetter.previousWarnings
    .split(".")
    .filter(Boolean);
  const expectedImprovements = warningLetter.expectedImprovements
    .split(".")
    .filter(Boolean);
  const nonImprovementConsequences = warningLetter.nonImprovementConsequences
    .split(".")
    .filter(Boolean);

  let row = 20;

  doc.setFontSize(18);
  doc.text("Warning Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To the attention of ${warningLetter.fullName},`, 10, row);
  row += 10;
  doc.text(
    `This letter is to formally inform you of a serious issue concerning your performance and/or conduct as an employee in the position of ${warningLetter.position} in the ${warningLetter.department} department. The issue is as follows:`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  for (const issue of issueDescription) {
    const wrappedText = doc.splitTextToSize(`* ${issue}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 10;
  doc.text(
    `Please note that this is not the first instance of such an issue. Previous warnings include:`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  for (const warning of previousWarnings) {
    const wrappedText = doc.splitTextToSize(`* ${warning}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 10;
  doc.text(
    `We expect the following improvements in your performance and/or conduct:`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  for (const improvement of expectedImprovements) {
    const wrappedText = doc.splitTextToSize(`* ${improvement}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 10;
  doc.text(
    `Failure to show the expected improvements will result in the following consequences:`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  for (const consequence of nonImprovementConsequences) {
    const wrappedText = doc.splitTextToSize(`* ${consequence}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 10;
  doc.text(
    `This warning letter is issued by ${warningLetter.supervisorName}, and is valid until ${warningLetter.expiry}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 10;
  doc.text(`Sincerely,`, 10, row);
  row += 10;
  doc.text(`${warningLetter.supervisorName}`, 10, row);

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateEmploymentVerificationLetter = async (
  verificationLetter: EmploymentVerificationLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  let row = 20;

  doc.setFontSize(18);
  doc.text("Employment Verification Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To whom it may concern,`, 10, row);
  row += 10;
  doc.text(
    `This letter is to verify that ${verificationLetter.fullName} is currently employed with Ethiring Sdn. Bhd. (the "Employer"). The details of their employment are as follows:`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(`Full Name: ${verificationLetter.fullName}`, 10, row);
  row += 10;
  doc.text(`Position: ${verificationLetter.position}`, 10, row);
  row += 10;
  doc.text(`Department: ${verificationLetter.department}`, 10, row);
  row += 10;
  doc.text(`Start Date: ${verificationLetter.startDate}`, 10, row);
  row += 10;
  doc.text(
    `Employment Status: ${verificationLetter.employmentStatus}`,
    10,
    row
  );
  row += 10;
  doc.text(`Current Salary: RM${verificationLetter.salary}`, 10, row);
  row += 10;
  if (verificationLetter.employmentEndDate) {
    doc.text(
      `Employment End Date: ${verificationLetter.employmentEndDate}`,
      10,
      row
    );
    row += 10;
  }
  doc.text(`Supervisor: ${verificationLetter.supervisorName}`, 10, row);
  row += 20;
  doc.text(
    `This letter is issued upon the request of ${verificationLetter.fullName} for whatever purpose it may serve. This letter is valid until ${verificationLetter.expiry}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(`Sincerely,`, 10, row);
  row += 20;
  doc.text(`Authorized Signatory,`, 10, row);
  row += 10;
  doc.text(`Ethiring Sdn. Bhd.`, 10, row);

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateJobDescriptionLetter = async (
  jobDescriptionLetter: JobDescriptionLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  // Prepare responsibilities array
  const responsibilities = jobDescriptionLetter.responsibilities
    .split(".")
    .filter(Boolean);

  // Prepare performance expectations array
  const performanceExpectations = jobDescriptionLetter.performanceExpectations
    .split(".")
    .filter(Boolean);

  let row = 20;

  doc.setFontSize(18);
  doc.text("Job Description Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To the attention of ${jobDescriptionLetter.fullName}, `, 10, row);
  row += 10;
  doc.text(
    `Ethiring Sdn. Bhd. (the "Employer") is pleased to offer you the position of ${jobDescriptionLetter.position} in the ${jobDescriptionLetter.department} department, starting from ${jobDescriptionLetter.startDate}. The following are the details of the job description:`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(`1. Your responsibilities will include:`, 10, row);
  row += 10;
  for (const responsibility of responsibilities) {
    const wrappedText = doc.splitTextToSize(`* ${responsibility}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 5;
  doc.text(`2. Your work schedule will be:`, 10, row);
  row += 10;
  doc.text(`${jobDescriptionLetter.workSchedule}`, 10, row, { maxWidth: 190 });
  row += 10;
  doc.text(`3. Your performance expectations include:`, 10, row);
  row += 10;
  for (const expectation of performanceExpectations) {
    const wrappedText = doc.splitTextToSize(`* ${expectation}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 5;
  doc.text(
    `4. You will be reporting to ${jobDescriptionLetter.supervisorName}.`,
    10,
    row
  );
  row += 10;
  doc.text(
    `Please note that this job description is valid until ${jobDescriptionLetter.expiry}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateTrainingCompletionLetter = async (
  trainingCompletionLetter: TrainingCompletionLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  let row = 20;

  doc.setFontSize(18);
  doc.text("Training Completion Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(
    `To the attention of ${trainingCompletionLetter.fullName}, `,
    10,
    row
  );
  row += 10;
  doc.text(
    `We are pleased to inform you that you have successfully completed the ${trainingCompletionLetter.trainingProgram} training program. Your dedication and hard work during the training have been commendable.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(`The details of your training completion are as follows:`, 10, row);
  row += 10;
  doc.text(`Employee Name: ${trainingCompletionLetter.fullName}`, 10, row);
  row += 10;
  doc.text(`Position: ${trainingCompletionLetter.position}`, 10, row);
  row += 10;
  doc.text(`Department: ${trainingCompletionLetter.department}`, 10, row);
  row += 10;
  doc.text(
    `Training Program: ${trainingCompletionLetter.trainingProgram}`,
    10,
    row
  );
  row += 10;
  doc.text(
    `Completion Date: ${trainingCompletionLetter.completionDate}`,
    10,
    row
  );
  row += 10;
  doc.text(`Supervisor: ${trainingCompletionLetter.supervisorName}`, 10, row);
  row += 20;
  doc.text(
    `We believe that the skills and knowledge you have gained during this training will significantly contribute to your performance and career growth. We look forward to your continued success and contributions to the team.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(
    `Congratulations once again on your achievement! Please do not hesitate to reach out to your supervisor, ${trainingCompletionLetter.supervisorName}, if you have any questions or require further assistance.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(
    `This letter is valid until ${trainingCompletionLetter.expiry}.`,
    10,
    row
  );

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateProbationPeriodCompletionLetter = async (
  probationLetter: ProbationPeriodCompletionLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  // Prepare performance summary array
  const performanceSummary = probationLetter.performanceSummary
    .split(".")
    .filter(Boolean);

  let row = 20;

  doc.setFontSize(18);
  doc.text("Probation Period Completion Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To the attention of ${probationLetter.fullName}, `, 10, row);
  row += 10;
  doc.text(
    `We are pleased to inform you that you have successfully completed your probation period for the position of ${probationLetter.position} in the ${probationLetter.department} department, effective as of ${probationLetter.probationEndDate}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(`Performance Summary:`, 10, row);
  row += 10;
  for (const summaryItem of performanceSummary) {
    const wrappedText = doc.splitTextToSize(`* ${summaryItem}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 5;
  doc.text(
    `Based on your performance, we are pleased to confirm your continued employment with Ethiring Sdn. Bhd. as a ${probationLetter.position}. ${probationLetter.employmentConfirmation}`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(
    `Please feel free to reach out to your supervisor, ${probationLetter.supervisorName}, should you have any questions or require further assistance.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(
    `This confirmation is valid until ${probationLetter.expiry}.`,
    10,
    row
  );

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateLeaveApprovalLetter = async (
  leaveApprovalLetter: LeaveApprovalLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  let row = 20;

  doc.setFontSize(18);
  doc.text("Leave Approval Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To: ${leaveApprovalLetter.fullName}`, 10, row);
  row += 10;
  doc.text(`${leaveApprovalLetter.position}`, 10, row);
  row += 10;
  doc.text(`${leaveApprovalLetter.department} Department`, 10, row);
  row += 20;
  doc.text(`Dear ${leaveApprovalLetter.fullName},`, 10, row);
  row += 10;
  doc.text(
    `We are pleased to inform you that your leave request has been approved. Below are the details of your leave:`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(`1. Leave Type: ${leaveApprovalLetter.leaveType}`, 10, row);
  row += 10;
  doc.text(
    `2. Leave Start Date: ${leaveApprovalLetter.leaveStartDate}`,
    10,
    row
  );
  row += 10;
  doc.text(`3. Leave End Date: ${leaveApprovalLetter.leaveEndDate}`, 10, row);
  row += 10;
  doc.text(
    `4. You will be reporting to ${leaveApprovalLetter.supervisorName} upon your return.`,
    10,
    row
  );
  row += 20;
  doc.text(
    `Please ensure that all your tasks are handed over to the concerned team members before you proceed on leave. We wish you a pleasant and restful break.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(
    `This approval is valid until ${leaveApprovalLetter.expiry}.`,
    10,
    row
  );
  row += 20;
  doc.text(`Sincerely,`, 10, row);
  row += 10;
  doc.text(`[Your Company Name]`, 10, row);

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateReferenceLetter = async (
  referenceLetter: ReferenceLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  // Prepare skills array
  const skills = referenceLetter.skills.split(".").filter(Boolean);

  let row = 20;

  doc.setFontSize(18);
  doc.text("Reference Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To the attention of [Recipient's Name],`, 10, row);
  row += 10;
  doc.text(
    `This letter serves as a reference for ${referenceLetter.fullName}, who held the position of ${referenceLetter.position} in the ${referenceLetter.department} department at Ethiring Sdn. Bhd. from ${referenceLetter.employmentStartDate} to ${referenceLetter.employmentEndDate}. During this time, ${referenceLetter.fullName} demonstrated a high level of skill and professionalism in their role.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 40;
  doc.text(
    `Throughout their employment, ${referenceLetter.fullName} exhibited the following skills and competencies:`,
    10,
    row
  );
  row += 10;
  for (const skill of skills) {
    const wrappedText = doc.splitTextToSize(`* ${skill}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 5;
  doc.text(
    `I highly recommend ${referenceLetter.fullName} for any future endeavors. They were a valuable member of our team, and their contributions were greatly appreciated. If you require any additional information, please do not hesitate to contact me.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 40;
  doc.text(`Sincerely,`, 10, row);
  row += 10;
  doc.text(`${referenceLetter.supervisorName}`, 10, row);
  row += 10;
  doc.text(`Supervisor, Ethiring Sdn. Bhd.`, 10, row);

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateRelocationLetter = async (
  relocationLetter: RelocationLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  // Prepare relocation assistance details array
  const assistanceDetails = relocationLetter.relocationAssistanceDetails
    .split(".")
    .filter(Boolean);

  let row = 20;

  doc.setFontSize(18);
  doc.text("Relocation Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To the attention of ${relocationLetter.fullName},`, 10, row);
  row += 10;
  doc.text(
    `Ethiring Sdn. Bhd. (the "Employer") is pleased to inform you of your relocation to a new position as ${relocationLetter.newPosition} in the ${relocationLetter.department} department. This relocation will take effect from ${relocationLetter.effectiveDate}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(
    `Your new location will be: ${relocationLetter.newLocation}`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(
    `In addition to this relocation, we are providing you with the following assistance:`,
    10,
    row
  );
  row += 10;
  for (const detail of assistanceDetails) {
    const wrappedText = doc.splitTextToSize(`* ${detail}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 10;
  doc.text(
    `Your supervisor for this new position will be ${relocationLetter.supervisorName}. Please ensure that all necessary arrangements are made prior to the effective date. This relocation letter is valid until ${relocationLetter.expiry}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateRetirementLetter = async (
  retirementLetter: RetirementLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  // Prepare retirement benefits array
  const benefits = retirementLetter.retirementBenefits
    .split(".")
    .filter(Boolean);

  let row = 20;

  doc.setFontSize(18);
  doc.text("Retirement Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To the attention of ${retirementLetter.supervisorName}, `, 10, row);
  row += 10;
  doc.text(
    `I, ${retirementLetter.fullName}, currently holding the position of ${retirementLetter.position} in the ${retirementLetter.department} department, am writing to formally announce my retirement. My retirement will be effective from ${retirementLetter.retirementDate}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(`The retirement benefits I am entitled to are as follows:`, 10, row);
  row += 10;
  for (const benefit of benefits) {
    const wrappedText = doc.splitTextToSize(`* ${benefit}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 10;
  doc.text(
    `I have greatly valued my time at the company and appreciate all the support and opportunities I have been given. Please let me know if there are any additional formalities I need to complete before my departure.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 10;
  doc.text(`This letter is valid until ${retirementLetter.expiry}.`, 10, row);

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateEndOfContractLetter = async (
  endOfContractLetter: EndOfContractLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  // Prepare reason array
  const reason = endOfContractLetter.reason.split(".").filter(Boolean);

  let row = 20;

  doc.setFontSize(18);
  doc.text("End of Contract Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(`To the attention of ${endOfContractLetter.fullName},`, 10, row);
  row += 10;
  doc.text(
    `We regret to inform you that your contract with ${endOfContractLetter.department} will be ending on ${endOfContractLetter.contractEndDate}. This decision is in accordance with the terms and conditions outlined in your employment contract.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(`The reasons for this decision are as follows:`, 10, row);
  row += 10;
  for (const reasonItem of reason) {
    const wrappedText = doc.splitTextToSize(`* ${reasonItem}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 10;
  doc.text(
    `Your supervisor, ${endOfContractLetter.supervisorName}, will assist you with the transition process and provide any necessary support during this period.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 10;
  doc.text(
    `Please ensure that all company property and documents are returned before your departure. This letter is valid until ${endOfContractLetter.expiry}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const generateChangeInEmploymentTermsLetter = async (
  changeInEmploymentTermsLetter: ChangeInEmploymentTermsLetter
): Promise<Blob | null> => {
  const doc = new jsPDF();

  // Prepare newTerms and reason arrays
  const newTerms = changeInEmploymentTermsLetter.newTerms
    .split(".")
    .filter(Boolean);
  const reason = changeInEmploymentTermsLetter.reason
    .split(".")
    .filter(Boolean);

  let row = 20;

  doc.setFontSize(18);
  doc.text("Change in Employment Terms Letter", 105, row, { align: "center" });

  doc.setFontSize(12);
  row += 20;
  doc.text(
    `To the attention of ${changeInEmploymentTermsLetter.fullName}, `,
    10,
    row
  );
  row += 10;
  doc.text(
    `We are writing to inform you of a change in your employment terms. The details of the new terms are outlined below, effective from ${changeInEmploymentTermsLetter.effectiveDate}.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 20;
  doc.text(
    `1. Your current position: ${changeInEmploymentTermsLetter.position}`,
    10,
    row
  );
  row += 10;
  doc.text(
    `2. Your current department: ${changeInEmploymentTermsLetter.department}`,
    10,
    row
  );
  row += 20;
  doc.text(`The new terms of your employment are as follows:`, 10, row);
  row += 10;
  for (const term of newTerms) {
    const wrappedText = doc.splitTextToSize(`* ${term}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 10;
  doc.text(`Reason for the change:`, 10, row);
  row += 10;
  for (const reasonItem of reason) {
    const wrappedText = doc.splitTextToSize(`* ${reasonItem}`, 190);
    doc.text(wrappedText, 10, row);
    row += doc.getTextDimensions(wrappedText).h + 5;
  }
  row += 10;
  doc.text(
    `Please acknowledge receipt of this letter and contact your supervisor, ${changeInEmploymentTermsLetter.supervisorName}, if you have any questions regarding these changes.`,
    10,
    row,
    { maxWidth: 190, align: "justify" }
  );
  row += 10;
  doc.text(
    `This letter is valid until ${changeInEmploymentTermsLetter.expiry}.`,
    10,
    row
  );

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const confirmed = await showPDFInIframe(url, "Upload to IPFS");

  if (confirmed) {
    return pdfBlob;
  }
  return null;
};

export const showPDFInIframe = (
  url: string,
  title: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    // Create a modal container
    const modalContainer = document.createElement("div");
    modalContainer.style.position = "fixed";
    modalContainer.style.top = "0";
    modalContainer.style.left = "0";
    modalContainer.style.width = "100%";
    modalContainer.style.height = "100%";
    modalContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modalContainer.style.display = "flex";
    modalContainer.style.alignItems = "center";
    modalContainer.style.justifyContent = "center";
    modalContainer.style.zIndex = "1000";

    // Create a content container
    const contentContainer = document.createElement("div");
    contentContainer.style.position = "relative";
    contentContainer.style.backgroundColor = "white";
    contentContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.25)";
    contentContainer.style.padding = "20px";
    contentContainer.style.borderRadius = "8px";
    contentContainer.style.display = "flex";
    contentContainer.style.flexDirection = "column";
    contentContainer.style.alignItems = "center";
    contentContainer.style.width = "80%";
    contentContainer.style.maxWidth = "800px";

    // Create an iframe element
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.width = "100%";
    iframe.style.height = "500px";
    iframe.style.border = "none";
    iframe.style.marginBottom = "20px";

    // Create a confirm button
    const confirmButton = document.createElement("button");
    confirmButton.textContent = title;
    confirmButton.style.padding = "10px 20px";
    confirmButton.style.backgroundColor = "#007BFF";
    confirmButton.style.color = "white";
    confirmButton.style.border = "none";
    confirmButton.style.borderRadius = "4px";
    confirmButton.style.cursor = "pointer";

    // Append the iframe and button to the content container
    contentContainer.appendChild(iframe);
    contentContainer.appendChild(confirmButton);

    // Append the iframe to the modal container
    modalContainer.appendChild(contentContainer);

    // Append the modal container to the body
    document.body.appendChild(modalContainer);

    // Handle confirm button click
    confirmButton.addEventListener("click", () => {
      document.body.removeChild(modalContainer);
      URL.revokeObjectURL(url);
      resolve(true);
    });

    // Close the modal when clicking outside the iframe
    modalContainer.addEventListener("click", (e) => {
      if (e.target === modalContainer) {
        document.body.removeChild(modalContainer);
        URL.revokeObjectURL(url);
        console.log("User closed the modal without confirming.");
        resolve(false);
      }
    });
  });
};

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formattedDate = date.toLocaleString("en-MY", options);
  const [datePart, timePart] = formattedDate.split(", ");
  const [month, day, year] = datePart.split("/");
  const formattedDateString = `${day}/${month}/${year} | ${timePart}`;
  return formattedDateString;
};

export const truncate = (hash: string) => {
  return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
};

export const analyzeDistributionOfPackageByType = (
  documents: EmploymentDocument[]
) => {
  const totalDocuments = documents.length;

  const packageMap: { [key in number]: string } = {
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

  const documentsByType = documents.reduce(
    (acc: { [key: string]: number }, doc) => {
      const type = packageMap[doc.packageType];
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {}
  );

  const signedByEmployer = documents.filter(
    (doc) => doc.employerSignature.length > 0
  ).length;
  const signedByEmployee = documents.filter(
    (doc) => doc.employeeSignature.length > 0
  ).length;

  const currentTime = Math.floor(Date.now() / 1000);
  const expiredDocuments = documents.filter(
    (doc) => doc.expiry < currentTime
  ).length;
  const activeDocuments = totalDocuments - expiredDocuments;

  const documentAges = documents.map((doc) => currentTime - doc.createdOn);
  const averageAge =
    documentAges.reduce((sum, age) => sum + age, 0) / documentAges.length;

  return {
    totalDocuments,
    documentsByType,
    signedByEmployer,
    signedByEmployee,
    expiredDocuments,
    activeDocuments,
    averageAge,
  };
};

const documentTypeArray = Object.keys(DocumentType).filter((key) =>
  isNaN(Number(key))
);

export const getDocumentTypeLabel = (type: number): string => {
  return documentTypeArray[type] || "Unknown";
};

export const generatePieChartData = (
  documents: EmploymentDocument[],
  activeAccount: string
) => {
  const completedDocuments = documents.filter(
    (doc) =>
      (doc.sender === activeAccount || doc.recipient === activeAccount) &&
      doc.employeeSignature !== "0x" &&
      doc.employerSignature !== "0x"
  );

  const typeCounts: { [key: number]: number } = {};

  completedDocuments.forEach((doc) => {
    const type = doc.packageType;
    typeCounts[type] = (typeCounts[type] || 0) + 1;
  });

  const labels = Object.keys(typeCounts).map((type) =>
    getDocumentTypeLabel(parseInt(type))
  );
  const data = Object.values(typeCounts);

  return {
    labels,
    datasets: [
      {
        label: "Document Types",
        data,
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

export const getRecentActivities = (
  documents: EmploymentDocument[],
  activeAccount: string,
  days: number = 30
): EmploymentDocument[] => {
  const now = Date.now();
  const cutoffDate = now - days * 24 * 60 * 60 * 1000;
  return documents
    .filter(
      (doc) =>
        (doc.lastModified * 1000 >= cutoffDate &&
          doc.sender == activeAccount) ||
        doc.recipient == activeAccount
    )
    .sort((a, b) => b.lastModified - a.lastModified);
};

export const calculateDaysAgo = (timestamp: number) => {
  const now = Date.now();
  const lastModifiedDate = new Date(timestamp * 1000); // Convert to milliseconds
  const differenceInMilliseconds = now - lastModifiedDate.getTime();
  const daysAgo = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  return `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
};

export const generateCSV = (data: User[]): string => {
  if (data.length === 0) {
    return "";
  }
  const headers = Object.keys(data[0]).join(",");
  const rows = data
    .map((row) =>
      Object.values(row)
        .map((value) => (value instanceof Date ? value.toISOString() : value))
        .join(",")
    )
    .join("\n");
  return `${headers}\n${rows}`;
};

export const downloadCSV = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

"use client";

import { readUserByAddress, readUsers } from "@/services/service";
import { User, UserResponse, UsersResponse } from "@/models/user";
import { DocumentType, useContractContext } from "@/context/contract";
import { OfferLetter, PromotionLetter } from "@/models/package";
import React, { useEffect, useState } from "react";
import { MdBuild } from "react-icons/md";
import { useStorageUpload } from "@thirdweb-dev/react";
import { useActiveAccount } from "thirdweb/react";
import {
  generateBonusLetter,
  generateChangeInEmploymentTermsLetter,
  generateContractRenewalLetter,
  generateEmploymentVerificationLetter,
  generateEndOfContractLetter,
  generateJobDescriptionLetter,
  generateLeaveApprovalLetter,
  generateOfferLetter,
  generateProbationPeriodCompletionLetter,
  generatePromotionLetter,
  generateReferenceLetter,
  generateRelocationLetter,
  generateResignationLetter,
  generateRetirementLetter,
  generateSalaryIncreaseLetter,
  generateTerminationLetter,
  generateTrainingCompletionLetter,
  generateTransferLetter,
  generateWarningLetter,
} from "@/utils/utils";
import { ethers } from "ethers";
import { formConfig } from "@/models/formConfig";
import { Loader } from "../loader/Loader";

interface FormProps<T> {
  docType: number;
  schema: T;
  isEmployer: boolean;
  onResponse: (response: { status: number; txHash: string | null }) => void;
}

type DocumentGenerator = (data: any) => Promise<Blob | null>;
const documentGenerators: Record<DocumentType, DocumentGenerator> = {
  [DocumentType.Offer]: generateOfferLetter,
  [DocumentType.Promotion]: generatePromotionLetter,
  [DocumentType.Resignation]: generateResignationLetter,
  [DocumentType.Termination]: generateTerminationLetter,
  [DocumentType.ContractRenewal]: generateContractRenewalLetter,
  [DocumentType.SalaryIncrease]: generateSalaryIncreaseLetter,
  [DocumentType.Bonus]: generateBonusLetter,
  [DocumentType.Transfer]: generateTransferLetter,
  [DocumentType.Warning]: generateWarningLetter,
  [DocumentType.EmploymentVerification]: generateEmploymentVerificationLetter,
  [DocumentType.JobDescription]: generateJobDescriptionLetter,
  [DocumentType.TrainingCompletion]: generateTrainingCompletionLetter,
  [DocumentType.ProbationPeriodCompletion]:
    generateProbationPeriodCompletionLetter,
  [DocumentType.LeaveApproval]: generateLeaveApprovalLetter,
  [DocumentType.Reference]: generateReferenceLetter,
  [DocumentType.Relocation]: generateRelocationLetter,
  [DocumentType.Retirement]: generateRetirementLetter,
  [DocumentType.EndOfContract]: generateEndOfContractLetter,
  [DocumentType.ChangeInEmploymentTerms]: generateChangeInEmploymentTermsLetter,
};

const commonSchema = {
  address: "",
};

type StatusMessage = {
  [key: number]: JSX.Element;
};

const statusMessage: StatusMessage = {
  0: (
    <>
      Craft the package
      <span className="ml-2">
        <MdBuild size={20} />
      </span>
    </>
  ),
  1: <span>Fetching employees data...</span>,
  2: <span>Processing...</span>,
  3: <span>Generating package...</span>,
  4: <span>Uploading to IPFS...</span>,
  5: <span>Pending signature...</span>,
  6: <span>Pending confirm...</span>,
  7: <span>Processing...</span>,
  8: <span>Confirming...</span>,
};

const DynamicForm = <T extends object>({
  docType,
  schema,
  isEmployer,
  onResponse,
}: FormProps<T>) => {
  const [loadStatus, setLoadStatus] = useState(1);
  const [employees, setEmployees] = useState<User[]>([]);
  const [selectedEmployeeAddress, setSelectedEmployeeAddress] = useState<
    string | undefined
  >(undefined);
  const [employee, setEmployee] = useState("");
  const { addDocument, getEmployer } = useContractContext();
  const { mutateAsync: upload } = useStorageUpload();
  const [activeAccount, setActiveAccount] = useState<string | undefined>(
    undefined
  );
  const [tempTx, setTempTx] = useState<string | null>(null);

  const employer = getEmployer();

  type SchemaWithAddress = T & { address: string };
  const mergedSchema: SchemaWithAddress = {
    ...schema,
    ...commonSchema,
  } as SchemaWithAddress;
  const [formState, setFormState] = useState<SchemaWithAddress>(mergedSchema);

  const fieldOrder = [
    "fullName",
    "address",
    ...Object.keys(schema).filter((key) => key !== "fullName"),
  ];

  const fetchEmployees = async () => {
    setLoadStatus(1);

    if (window?.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner().getAddress();
      setActiveAccount(signer);
    }

    // if employer, fetched all employees data for select option
    if (isEmployer) {
      const { users }: UsersResponse = await readUsers();
      const exceptEmployer = users.filter((user) => user.auth != getEmployer());
      setEmployees(exceptEmployer);
    }
    // if employee, set form state for full name and address
    else {
      // fetch employer as recipient
      const { user }: UserResponse = await readUserByAddress(getEmployer());
      setFormState((prev) => ({
        ...prev,
        fullName: `${user.first_name} ${user.last_name}`,
      }));
      setFormState((prev) => ({ ...prev, address: getEmployer() }));
      setEmployee(`${user.first_name} ${user.last_name}`);
    }
    setLoadStatus(0);
  };

  const sendResponseToParent = (response: {
    status: number;
    txHash: string | null;
  }) => {
    onResponse(response);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectEmployeeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      fullName: e.target.options[e.target.selectedIndex].text,
    }));

    setFormState((prev) => ({
      ...prev,
      address: e.target.value,
    }));

    const employeeAddress = e.target.value;
    const selectedEmployee: User | undefined = employees.find(
      (employee) => employee.auth == employeeAddress
    );
    setSelectedEmployeeAddress(`${selectedEmployee?.auth}` || undefined);
  };

  const handleCopyAddress = () => {
    if (selectedEmployeeAddress) {
      navigator.clipboard.writeText(selectedEmployeeAddress).then(
        () => {
          alert("Employee address copied");
        },
        (err) => {
          console.error("Failed to copy address: ", err);
        }
      );
    }
  };

  const handleDocumentGeneration = async (
    docType: DocumentType,
    formState: any
  ) => {
    const { address, ...commonSchema } = formState;

    const generateDocument = documentGenerators[docType];

    if (generateDocument) {
      const pdfBlob = await generateDocument(commonSchema);

      if (pdfBlob) {
        await uploadToIPFS(
          pdfBlob,
          address,
          Math.floor(new Date(commonSchema.expiry).getTime() / 1000),
          docType
        );
      }
    } else {
      console.error("Invalid document type");
    }
  };

  const requestSignatureAndSave = async (
    recipientAddress: string,
    docHash: string,
    expiryDate: number,
    docType: number
  ) => {
    sendResponseToParent({ status: 5, txHash: null });
    setLoadStatus(5);
    let signature = "";
    try {
      const message = `Please sign to confirm the upload of the document with CID: ${docHash}`;

      if (window?.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        signature = await provider.getSigner().signMessage(message);
        console.log("Signature: ", signature);
      }
    } catch (error) {
      console.error("Error during signature: ", error);
      return;
    }

    try {
      if (signature == "") {
        setLoadStatus(0);
        alert("Invalid signature");
        return;
      }

      sendResponseToParent({ status: 6, txHash: null });
      setLoadStatus(6);
      addDocument(
        recipientAddress,
        docType,
        docHash,
        signature,
        expiryDate,
        (status: boolean, txHash: string | null) => {
          if (!status && !txHash) {
            sendResponseToParent({ status: 6, txHash: null });
            setLoadStatus(6);
          } else if (!status && txHash) {
            setTempTx(txHash);
            sendResponseToParent({ status: 7, txHash: txHash });
            setLoadStatus(7);
            console.log("Processing tx: ", txHash);
          } else {
            setTempTx(txHash);
            sendResponseToParent({ status: 8, txHash: txHash });
            setLoadStatus(8);
            console.log("Confirmed tx: ", txHash);
            console.log("Document added at smart contract");
          }
        }
      );
    } catch (error) {
      console.error("Error during smart contract interaction: ", error);
    }
  };

  const uploadToIPFS = async (
    pdfBlob: Blob,
    recipientAddress: string,
    expiryDate: number,
    docType: number
  ) => {
    try {
      sendResponseToParent({ status: 4, txHash: null });
      setLoadStatus(4);
      const uploadPDF = new File([pdfBlob], "document.pdf", {
        type: "application/pdf",
      });

      // upload to ipfs
      const uris = await upload({
        data: [uploadPDF],
        options: {
          uploadWithGatewayUrl: true,
          uploadWithoutDirectory: true,
        },
      });
      const docHash = uris[0].split("/ipfs/")[1].split("/")[0];
      console.log(uris);
      await requestSignatureAndSave(
        recipientAddress,
        docHash,
        expiryDate,
        docType
      );
    } catch (error) {
      console.error("Failed to upload to IPFS: ", error);
    }
  };

  const renderStatusMessage = (loadStatus: number) => {
    return statusMessage[loadStatus] || <span>err</span>;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendResponseToParent({ status: 2, txHash: null });
    setLoadStatus(2);
    try {
      sendResponseToParent({ status: 3, txHash: null });
      setLoadStatus(3);
      await handleDocumentGeneration(docType, formState);
    } catch (error) {
      console.error("Error signing message: ", error);
    } finally {
      sendResponseToParent({ status: 0, txHash: null });
      setLoadStatus(0);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
        {fieldOrder.map((key) => {
          const config = formConfig[key];

          return (
            <>
              <div key={key} className="flex flex-col gap-1">
                <label htmlFor={key}>{config.label}</label>
                {key == "fullName" ? (
                  <>
                    {activeAccount && activeAccount == employer ? (
                      <select
                        name={key}
                        id={key}
                        className={`${
                          loadStatus != 0 ? "cursor-not-allowed" : null
                        }`}
                        onChange={handleSelectEmployeeChange}
                        disabled={loadStatus != 0}
                      >
                        <option value="">Select targetted employee</option>
                        {employees.map((employee) => (
                          <option
                            key={employee.auth}
                            value={employee.auth}
                          >{`${employee.first_name} ${employee.last_name}`}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        name={key}
                        id={key}
                        value={employee}
                        className="h-11 px-4 border rounded-md text-gray-400 text-sm"
                        readOnly
                      />
                    )}
                  </>
                ) : key === "address" ? (
                  <>
                    {activeAccount && activeAccount == employer ? (
                      <input
                        type={config.type}
                        name={key}
                        id={key}
                        value={selectedEmployeeAddress}
                        placeholder={config.placeholder}
                        className={`${
                          loadStatus != 0 ? "cursor-default" : null
                        } h-11 px-4 border rounded-md text-gray-400 text-sm ${
                          selectedEmployeeAddress
                            ? "cursor-pointer hover:text-blue-600 hover:border-blue-400 hover:border-2 transition ease-in-out"
                            : null
                        }`}
                        onClick={handleCopyAddress}
                        readOnly
                      />
                    ) : (
                      <input
                        type="text"
                        name={key}
                        id={key}
                        value={employer}
                        className="h-11 px-4 border rounded-md text-gray-400 text-sm"
                        readOnly
                      />
                    )}
                  </>
                ) : (
                  <input
                    type={config.type}
                    name={key}
                    id={key}
                    value={(formState as any)[key]}
                    placeholder={config.placeholder}
                    className={config.className}
                    onChange={handleChange}
                    disabled={loadStatus != 0}
                  />
                )}
              </div>
            </>
          );
        })}

        <button
          className={`flex items-center bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-800 transition ease-in-out ${
            loadStatus != 0 ? "cursor-not-allowed" : null
          }`}
          type="submit"
          disabled={loadStatus != 0}
        >
          {renderStatusMessage(loadStatus)}
        </button>
      </form>
    </>
  );
};

export default DynamicForm;

"use client";

import { EmploymentDocument, useContractContext } from "@/context/contract";
import {
  BonusLetter,
  ChangeInEmploymentTermsLetter,
  ContractRenewalLetter,
  documentTypeMapping,
  EndOfContractLetter,
  JobDescriptionLetter,
  LeaveApprovalLetter,
  OfferLetter,
  OfferLetterType,
  ProbationPeriodCompletionLetter,
  PromotionLetter,
  PromotionLetterType,
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
import { getWeb3Instance } from "@/lib/web3";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPDF, {
  Page,
  Text,
  View as ViewPDF,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { PDFComponent } from "@/components/pdf/PDF";

type DocumentData = OfferLetter | PromotionLetter | undefined;

export default function View({
  params,
}: {
  params: { user: string; package: string };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [packageData, setPackageData] = useState<EmploymentDocument>();
  const [documentData, setDocumentData] = useState<DocumentData>();
  const [offerLetter, setOfferLetter] = useState<OfferLetter>();
  const [promotionLetter, setPromotionLetter] = useState<PromotionLetter>();

  const { getEmployer, address, getEmploymentDocuments, getDecodedTx } =
    useContractContext();
  const router = useRouter();

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      fontFamily: "Oswald",
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: "Oswald",
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Times-Roman",
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const employer = await getEmployer();
      if (address != employer && params.user != address) {
        router.push("/package/all?status=403");
      }

      const data = await getEmploymentDocuments(params.user);
      if (data) {
        setPackageData(data.find((doc) => doc.id.eq(params.package)));
      }
    };
    fetchData();
  }, [address]);

  useEffect(() => {
    if (packageData) {
      let dataTypes: string[] = [];
      switch (packageData.docType) {
        case 0:
          dataTypes = OfferLetterType;
          break;
        case 1:
          dataTypes = PromotionLetterType;
          break;
        default:
          dataTypes = [];
      }

      const decodedData = getWeb3Instance().eth.abi.decodeParameters(
        dataTypes,
        packageData.encodedDocumentContent
      );

      switch (packageData.docType) {
        case 0:
          setOfferLetter({
            fullName: decodedData[0] as string,
            position: decodedData[1] as string,
            department: decodedData[2] as string,
            responsibilities: decodedData[3] as string,
            workSchedule: decodedData[4] as string,
            startDate: decodedData[5] as Date,
            salary: decodedData[6] as number,
            benefits: decodedData[7] as string,
            supervisorName: decodedData[8] as string,
            supervisorPosition: decodedData[9] as string,
            companyName: decodedData[10] as string,
            offerExpiryDate: decodedData[11] as Date,
            employerContact: decodedData[12] as string,
          });
          break;
        case 1:
          setPromotionLetter({
            fullName: decodedData[0] as string,
            position: decodedData[1] as string,
            newPosition: decodedData[2] as string,
            department: decodedData[3] as string,
            effectiveDate: decodedData[4] as Date,
            newSalary: decodedData[5] as number,
            newResponsibilities: decodedData[6] as string,
            supervisorName: decodedData[7] as string,
            supervisorPosition: decodedData[8] as string,
            companyName: decodedData[9] as string,
          });
          break;
        default:
          null;
      }
    }
  }, [packageData]);

  if (packageData) {
    switch (packageData.docType) {
      case 0:
        return (
          <>
            <div className="mt-20 sm:ml-64">
              <div className="mx-auto shadow border">
                {packageData ? (
                  <>
                    {offerLetter ? (
                      <PDFViewer width="50%" height="50%">
                        <PDFComponent />
                      </PDFViewer>
                    ) : null}
                  </>
                ) : // <div>
                //   {packageData.encodedDocumentContent}
                //   <div>{packageData.employee}</div>
                //   <div>{offerLetter?.fullName}</div>
                // </div>
                null}
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="mt-20">
              {packageData ? (
                <div>
                  {packageData.encodedDocumentContent}
                  <div>{packageData.employee}</div>
                  <div>{promotionLetter?.fullName}</div>
                </div>
              ) : null}
            </div>
          </>
        );

      default:
        return null;
    }
  }
}

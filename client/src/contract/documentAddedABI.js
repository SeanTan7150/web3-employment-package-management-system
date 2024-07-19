export const documentAddedABI = {
  anonymous: false,
  inputs: [
    {
      indexed: true,
      internalType: "address",
      name: "employee",
      type: "address",
    },
    {
      indexed: true,
      internalType: "enum EmploymentPackage.Type",
      name: "documentType",
      type: "uint8",
    },
    {
      indexed: false,
      internalType: "bytes",
      name: "encodedDocumentContent",
      type: "bytes",
    },
    {
      indexed: false,
      internalType: "uint256",
      name: "timestamp",
      type: "uint256",
    },
  ],
  name: "DocumentAdded",
  type: "event",
};

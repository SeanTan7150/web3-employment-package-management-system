export const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
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
  },
  {
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
        internalType: "uint256",
        name: "documentId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "signedByEmployee",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "signedByEmployer",
        type: "bool",
      },
    ],
    name: "DocumentSigned",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employee",
        type: "address",
      },
      {
        internalType: "enum EmploymentPackage.Type",
        name: "_docType",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "_encodedDocumentContent",
        type: "bytes",
      },
    ],
    name: "addDocument",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "employees",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "employer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "employmentDocuments",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "enum EmploymentPackage.Type",
        name: "docType",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "encodedDocumentContent",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        internalType: "bool",
        name: "signedByEmployee",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "signedByEmployer",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllEmploymentDocuments",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "enum EmploymentPackage.Type",
            name: "docType",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "encodedDocumentContent",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "employee",
            type: "address",
          },
          {
            internalType: "bool",
            name: "signedByEmployee",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "signedByEmployer",
            type: "bool",
          },
        ],
        internalType: "struct EmploymentPackage.EmploymentDocument[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEmployer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employee",
        type: "address",
      },
    ],
    name: "getEmploymentDocuments",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "enum EmploymentPackage.Type",
            name: "docType",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "encodedDocumentContent",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "employee",
            type: "address",
          },
          {
            internalType: "bool",
            name: "signedByEmployee",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "signedByEmployer",
            type: "bool",
          },
        ],
        internalType: "struct EmploymentPackage.EmploymentDocument[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextDocumentId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numberOfDocs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_documentId",
        type: "uint256",
      },
    ],
    name: "signDocument",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

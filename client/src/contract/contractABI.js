export const contractABI = [
  { inputs: [], stateMutability: "payable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum EmploymentPackage.PackageType",
        name: "packageType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "documentHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "signature",
        type: "bytes",
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
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "DocumentSigned",
    type: "event",
  },
  {
    inputs: [],
    name: "_employer",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_recipient", type: "address" },
      {
        internalType: "enum EmploymentPackage.PackageType",
        name: "_packageType",
        type: "uint8",
      },
      { internalType: "string", name: "_documentHash", type: "string" },
      { internalType: "bytes", name: "_signature", type: "bytes" },
      { internalType: "uint256", name: "_expiry", type: "uint256" },
    ],
    name: "addDocument",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getDocuments",
    outputs: [
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          {
            internalType: "enum EmploymentPackage.PackageType",
            name: "packageType",
            type: "uint8",
          },
          { internalType: "string", name: "documentHash", type: "string" },
          { internalType: "bytes", name: "employerSignature", type: "bytes" },
          { internalType: "bytes", name: "employeeSignature", type: "bytes" },
          { internalType: "uint256", name: "createdOn", type: "uint256" },
          { internalType: "uint256", name: "lastModified", type: "uint256" },
          { internalType: "uint256", name: "expiry", type: "uint256" },
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
    name: "numberOfDocuments",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_index", type: "uint256" },
      { internalType: "bytes", name: "_signature", type: "bytes" },
    ],
    name: "signDocument",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

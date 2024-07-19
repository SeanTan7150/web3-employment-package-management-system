export const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
    ],
    name: "JobActivated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "applicant",
        type: "address",
      },
    ],
    name: "JobApplied",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
    ],
    name: "JobDeactivated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "postedBy",
        type: "address",
      },
    ],
    name: "JobPublished",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "id", type: "address" },
    ],
    name: "ProfileCreated",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "_jobPostId", type: "uint256" }],
    name: "activateJob",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_jobPostId", type: "uint256" }],
    name: "applyJob",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "_encodedUserDetails", type: "bytes" },
    ],
    name: "createUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_jobPostId", type: "uint256" }],
    name: "deactivateJob",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_jobPostId", type: "uint256" }],
    name: "getJobApplicants",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getJobs",
    outputs: [
      {
        components: [
          { internalType: "address", name: "postedBy", type: "address" },
          { internalType: "bytes", name: "encodedJobDetails", type: "bytes" },
          { internalType: "uint256", name: "postedOn", type: "uint256" },
          { internalType: "bool", name: "isAvailable", type: "bool" },
          { internalType: "address[]", name: "applicants", type: "address[]" },
        ],
        internalType: "struct Employment.JobPost[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "userAddress", type: "address" }],
    name: "getUser",
    outputs: [
      {
        components: [
          { internalType: "bytes", name: "encodedUserDetails", type: "bytes" },
          {
            internalType: "bytes",
            name: "encodedWorkExperiences",
            type: "bytes",
          },
          { internalType: "uint256", name: "registeredOn", type: "uint256" },
          { internalType: "bool", name: "isRegistered", type: "bool" },
        ],
        internalType: "struct Employment.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "jobPosts",
    outputs: [
      { internalType: "address", name: "postedBy", type: "address" },
      { internalType: "bytes", name: "encodedJobDetails", type: "bytes" },
      { internalType: "uint256", name: "postedOn", type: "uint256" },
      { internalType: "bool", name: "isAvailable", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numberOfJobs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "_encodedJobDetails", type: "bytes" },
    ],
    name: "publishJob",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "_encodedUserDetails", type: "bytes" },
    ],
    name: "updateUserDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "_encodedWorkExperiences", type: "bytes" },
    ],
    name: "updateUserWorkExperiences",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "users",
    outputs: [
      { internalType: "bytes", name: "encodedUserDetails", type: "bytes" },
      { internalType: "bytes", name: "encodedWorkExperiences", type: "bytes" },
      { internalType: "uint256", name: "registeredOn", type: "uint256" },
      { internalType: "bool", name: "isRegistered", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

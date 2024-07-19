export interface UserData {
  profileImageUrl: string; // IPFS
  firstName: string;
  lastName: string;
  username: string;
  mobile: string;
  residency: string; // country
  email: string;
  resume: string; // IPFS
  skills: string[];
  minExpectedMonthlySalary: number;
  maxExpectedMonthlySalary: number;
  bio: string;
}

export const userDataTypes = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string[]",
  "uint256",
  "uint256",
  "string",
];

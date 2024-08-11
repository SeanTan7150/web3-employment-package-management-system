// // src/lib/prisma.ts
// import { PrismaClient } from "@prisma/client";

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   // In development mode, use a global variable to avoid multiple instances
//   if (!globalThis.prisma) {
//     globalThis.prisma = new PrismaClient();
//   }
//   prisma = globalThis.prisma;
// }

// export default prisma;

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;

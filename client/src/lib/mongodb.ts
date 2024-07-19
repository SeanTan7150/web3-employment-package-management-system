import prisma from "../../prisma";

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Unable to connect to database: ", error);
  }
};

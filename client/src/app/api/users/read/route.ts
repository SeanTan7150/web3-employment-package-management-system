import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const auth = searchParams.get("auth");

    await connectToDatabase();

    if (auth) {
      const user = await prisma.user.findUnique({
        where: { auth },
      });
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ user }, { status: 200 });
    }

    const users = await prisma.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch user: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

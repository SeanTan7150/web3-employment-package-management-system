import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export const POST = async (req: Request) => {
  try {
    const { auth, email, first_name, last_name } = await req.json();
    if (!auth || !email || !first_name || !last_name) {
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });
    }
    await connectToDatabase();
    const newUser = await prisma.user.create({
      data: { auth, email, first_name, last_name },
    });
    console.log("Successfully registered!", newUser);
    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    console.error("Failed to insert user: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

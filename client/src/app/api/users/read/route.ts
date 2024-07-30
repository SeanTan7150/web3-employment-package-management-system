import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch user: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

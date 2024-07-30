import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma";

export async function GET(request: Request, context: any) {
  try {
    const { params } = context;
    const auth = params.address;

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
  } catch (error) {
    console.error("Failed to fetch user: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

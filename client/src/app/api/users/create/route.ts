import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function POST(req: Request) {
  try {
    const { auth, email, first_name, last_name } = await req.json();

    if (!auth) {
      return NextResponse.json(
        { message: "Invalid user address" },
        { status: 422 }
      );
    }

    if (!first_name) {
      return NextResponse.json(
        { message: "Invalid user first name" },
        { status: 422 }
      );
    }

    if (!last_name) {
      return NextResponse.json(
        { message: "Invalid user last name" },
        { status: 422 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        auth,
        email,
        first_name,
        last_name,
      },
    });
    console.log("Successfully registered!", newUser);
    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    console.error("Failed to insert user: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

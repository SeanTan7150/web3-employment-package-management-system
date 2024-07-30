import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function PUT(req: Request) {
  try {
    const { auth, profile_image } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { auth: auth },
      data: { profile_image: profile_image },
    });
    console.log("Successfully updated profile image!", updatedUser);
    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Failed to update profile image: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

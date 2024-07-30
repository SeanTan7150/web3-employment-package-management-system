import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function PUT(req: Request) {
  try {
    const { auth } = await req.json();

    const deactivatedUser = await prisma.user.update({
      where: { auth: auth },
      data: { is_activated: false },
    });
    console.log("Successfully deactivated!", deactivatedUser);
    return NextResponse.json({ deactivatedUser }, { status: 200 });
  } catch (error) {
    console.error("Failed to deactivate user: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

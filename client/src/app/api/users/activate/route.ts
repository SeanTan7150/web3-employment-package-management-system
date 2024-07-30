import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function PUT(req: Request) {
  try {
    const { auth } = await req.json();

    const activatedUser = await prisma.user.update({
      where: { auth: auth },
      data: { is_activated: true },
    });
    console.log("Successfully activated!", activatedUser);
    return NextResponse.json({ activatedUser }, { status: 200 });
  } catch (error) {
    console.error("Failed to activate user: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { image, filename } = await req.json();

    if (!image || !filename) {
      return NextResponse.json(
        { message: "Image or filename missing" },
        { status: 400 }
      );
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const filePath = path.join(process.cwd(), "public", "profile", filename);
    fs.writeFileSync(filePath, buffer);

    console.log("Successfully upload file to public folder!", filename);
    return NextResponse.json({ filename }, { status: 200 });
  } catch (error) {
    console.error("Failed to upload file to public folder: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// import { connectToDatabase } from "@/lib/mongodb";
// import { NextResponse } from "next/server";
// import prisma from "../../../../prisma";

// export const handler = async (req: Request) => {
//   const { method } = req;
//   switch (method) {
//     case "POST":
//       return await handlePost(req);
//     case "GET":
//       return await handleGet();
//     default:
//       return NextResponse.json(
//         { message: `Invalid method: ${method}` },
//         { status: 405 }
//       );
//   }
// };

// const handlePost = async (req: Request) => {
//   const { action } = await req.json();

//   switch (action) {
//     case "createUser":
//       return await createUser(req);
//     case "readUserByAddress":
//       return await readUserByAddress(req);
//     default:
//       return NextResponse.json({ message: "Invalid action" }, { status: 400 });
//   }
// };

// // Create user
// const createUser = async (req: Request) => {
//   try {
//     const { auth, email, first_name, last_name } = await req.json();
//     if (!auth || !email || !first_name || !last_name)
//       return NextResponse.json({ message: "Invalid data" }, { status: 422 });
//     await connectToDatabase();
//     const newUser = await prisma.user.create({
//       data: { auth, email, first_name, last_name },
//     });
//     console.log("Successfully registered!", newUser);
//     return NextResponse.json({ newUser }, { status: 201 });
//   } catch (error) {
//     console.error("Failed to insert user: ", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// };

// // Read user by address
// const readUserByAddress = async (req: Request) => {
//   try {
//     const { auth } = await req.json();
//     if (!auth) {
//       return NextResponse.json({ message: "Invalid data" }, { status: 422 });
//     }
//     await connectToDatabase();
//     const user = await prisma.user.findUnique({ where: { auth } });
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }
//     return NextResponse.json(user, { status: 200 });
//   } catch (error) {
//     console.error("Failed to fetch user: ", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// };

// // Read all users
// export const handleGet = async () => {
//   try {
//     await connectToDatabase();
//     const users = await prisma.user.findMany();
//     return NextResponse.json(users, { status: 200 });
//   } catch (error) {
//     console.error("Failed to fetch users: ", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// };

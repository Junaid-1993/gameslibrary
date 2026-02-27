import { signUpSchema } from "@/app/Schema/auth";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Mock already exist database user
// const existedUser = {
//   username: "alex",
//   email: "alex@example.com",
//   password: "password123",
// };

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Server-side validation
    const result = signUpSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { username, email, password } = result.data;

    // const deleteUser = await prisma.user.delete({
    //   where: {
    //     email: "alexmercer@example.com",
    //   },
    // });

    // Check if user already exist in the database:
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "This email already taken.", field: "email" },
        { status: 409 }
      );
    }

    const data = await auth.api.signUpEmail({
      body: {
        name: username,
        email: email,
        password: password,
      },
    });

    // if (username === existedUser.username) {
    //   return NextResponse.json(
    //     { message: "This username already exist.", field: "username" },
    //     { status: 409 }
    //   );
    // }

    // if (email === existedUser.email) {
    //   return NextResponse.json(
    //     { message: "This email is taken.", field: "email" },
    //     { status: 409 }
    //   );
    // }

    // Hash password (bcrypt) and save to Database (Prisma/Mongoose)
    // console.log("Saving user:", { username, email });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

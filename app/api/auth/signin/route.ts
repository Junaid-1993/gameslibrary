import { signInSchema } from "@/app/Schema/auth";
import { NextResponse } from "next/server";

// Mock database user
const mockUser = {
  username: "alex",
  email: "alex@example.com",
  password: "password123",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = signInSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { identifier, password, remember } = result.data;

    // Check if identifier matches email OR username
    const userMatches = identifier === mockUser.email || identifier === mockUser.username;

    // Direct string comparison (No bcrypt)
    const passwordMatches = password === mockUser.password;

    if (!userMatches || !passwordMatches) {
      return NextResponse.json({ message: "Invalid email/username or password." }, { status: 401 });
    }

    console.log(remember);

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

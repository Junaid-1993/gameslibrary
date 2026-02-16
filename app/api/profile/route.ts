import { profileSchema } from "@/app/Schema/ProfileSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = profileSchema.safeParse(body);

    if (!validation.success) {
      // Must return a response with an explicit error status
      return NextResponse.json({ error: validation.error.message }, { status: 400 });
    }

    const data = validation.data;
    console.log("Valid data received:", data);

    // Things to check before updating the Username to database:
    // Invalid characters(optional but recommended)
    // “Usernames can only contain letters, numbers, dots, and underscores.”
    // “No spaces allowed in usernames.”

    // Username already taken(if applicable)
    // “That username is already taken.Try another one.”
    // “This username isn’t available.”

    // Return succuss message:
    return NextResponse.json({ message: "Profile updated successfully", data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

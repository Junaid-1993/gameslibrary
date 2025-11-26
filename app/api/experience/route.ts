import { experienceSchema } from "@/app/Schema/ExperienceSchema";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = experienceSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(
            { errors: validation.error.issues },
            { status: 400 }
        );
    }

    return NextResponse.json({ data: validation.data }, { status: 200 });
}
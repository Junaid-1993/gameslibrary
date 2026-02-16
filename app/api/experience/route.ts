import { experienceSchema } from "@/app/Schema/ExperienceSchema";
import { NextRequest, NextResponse } from "next/server";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

async function sanitizeMarkdown(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize, defaultSchema)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = experienceSchema.safeParse(body);

    // Step 1: Validate form fields
    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.issues }, { status: 400 });
    }

    // Work with a copy of the data
    const data = { ...validation.data };

    // Step 2: Sanitize markdown fields
    if (data.detailedReview) {
      data.detailedReview = await sanitizeMarkdown(data.detailedReview);
    }

    // Step 3: moderation placeholder
    // e.g. call an external API or run keyword checks
    // const moderationResult = await checkModeration(data.detailedReview);
    // if (moderationResult.block) {
    //   return NextResponse.json({ error: "Content not allowed" }, { status: 403 });
    // }

    // Step 4: Database Logic
    // const savedEntry = await prisma.experience.create({ data });
    console.log("Processed Data:", data);

    return NextResponse.json({ message: "Success", data: data }, { status: 200 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

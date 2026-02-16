import { z } from "zod";

// Define these as constants to reuse in your UI components
export const ALLOWED_TAGS = ["immersive", "grindy", "emotional", "buggy"] as const;

export const experienceSchema = z
  .object({
    reviewTitle: z
      .string()
      .trim()
      .min(1, "Please enter a title for your experience.")
      .max(80, "Title must be under 80 characters."),
    reviewSummary: z
      .string()
      .trim()
      .min(1, "Please share a summary for your experience.")
      .max(280, "Summary must be under 280 characters."),
    detailedReviewEnabled: z.boolean(), // toggle flag

    // detailed fields start optional
    platformsPlayed: z.array(z.string()).optional(),
    totalHours: z.string().optional(),
    completionStatus: z.string().optional(),
    detailedReview: z.string().optional(),
    goodPoint: z.array(z.object({ id: z.number(), text: z.string().trim().min(1) })).optional(),
    badPoint: z.array(z.object({ id: z.number(), text: z.string().trim().min(1) })).optional(),

    tags: z.array(z.string()).optional(),
  })
  // Detailed Fields will validate if toggle is 'on':
  .superRefine((data, ctx) => {
    if (data.detailedReviewEnabled) {
      if (!data.platformsPlayed || data.platformsPlayed.length < 1) {
        ctx.addIssue({
          path: ["platformsPlayed"],
          code: "custom",
          message: "Please select at least one platform.",
        });
      }
      const hours = data.totalHours ? Number(data.totalHours) : undefined;

      if (!hours || hours <= 0 || hours >= 1000) {
        ctx.addIssue({
          path: ["totalHours"],
          code: "custom",
          message: "Hours must be between 1 and 999.",
        });
      }
      if (!data.completionStatus || data.completionStatus.trim().length === 0) {
        ctx.addIssue({
          path: ["completionStatus"],
          code: "custom",
          message: "Please select how far you got.",
        });
      }
      if (!data.detailedReview || data.detailedReview.trim().length < 50) {
        ctx.addIssue({
          path: ["detailedReview"],
          code: "custom",
          message: "Review must be at least 50 characters.",
        });
      }
      // Validate Tags against predefined list
      if (data.tags && data.tags.length > 0) {
        const invalidTags = data.tags.filter((tag) => !ALLOWED_TAGS.includes(tag as any));

        if (invalidTags.length > 0) {
          ctx.addIssue({
            path: ["tags"],
            code: "custom",
            message: `Invalid tags selected: ${invalidTags.join(", ")}`,
          });
        }
      }
      if (!data.goodPoint || data.goodPoint.length < 1) {
        ctx.addIssue({
          path: ["goodPoint"],
          code: "custom",
          message: "Please add at least one good point.",
        });
      }
      if (!data.badPoint || data.badPoint.length < 1) {
        ctx.addIssue({
          path: ["badPoint"],
          code: "custom",
          message: "Please add at least one bad point.",
        });
      }
    }
  });

import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This attaches the error to the confirmPassword field
  });

export type SignUpValues = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, "Please enter your email or username")
    .refine(
      (val) => {
        // 1. Check if it's a valid email structure
        const isEmail = z.string().email().safeParse(val).success;

        // 2. Check if it's a valid username (e.g., no '@' and min 3 chars)
        const isUsername = !val.includes("@") && val.length >= 3;

        // Logic: It must be ONE of these to be valid
        return isEmail || isUsername;
      },
      {
        message: "Enter a valid email or a username (at least 3 characters)",
      }
    ),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

export type SignInValues = z.infer<typeof signInSchema>;

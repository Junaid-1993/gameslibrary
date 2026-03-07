import { z } from "zod";
import {
  changePasswordSchema,
  passwordSchema,
  requiredPasswordSchema,
  resetPasswordSchema,
  signUpPasswordFieldsSchema,
} from "./password";

const usernameSchema = z.string().trim().min(3, "Username must be at least 3 characters");
const emailSchema = z.email("Please enter a valid email address");
const emailOrUsernameSchema = z
  .string()
  .trim()
  .min(1, "Please enter your email or username")
  .refine(
    (val) => {
      const isEmail = z.email().safeParse(val).success;
      const isUsername = !val.includes("@") && val.length >= 3;
      return isEmail || isUsername;
    },
    {
      message: "Enter a valid email or a username (at least 3 characters)",
    }
  );

export const signUpSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    ...signUpPasswordFieldsSchema.shape,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpValues = z.infer<typeof signUpSchema>;

// To validate on the server
export const signUpServerSchema = z.object({
  name: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type SignUpServerValues = z.infer<typeof signUpServerSchema>;

export const signInSchema = z.object({
  identifier: emailOrUsernameSchema,
  password: requiredPasswordSchema,
  remember: z.boolean().optional(),
});

export type SignInValues = z.infer<typeof signInSchema>;

// Better Auth sign-in payload uses `email` + `password`.
// We allow `email` to carry either email or username, then resolve in auth hook.
export const signInServerSchema = z.object({
  email: emailOrUsernameSchema,
  password: requiredPasswordSchema,
});

export type SignInServerValues = z.infer<typeof signInServerSchema>;

export const forgotPasswordRequestSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordRequestValues = z.infer<typeof forgotPasswordRequestSchema>;

export const resetPasswordServerSchema = z.object({
  newPassword: passwordSchema,
  token: z.string().trim().optional(),
});

export type ResetPasswordServerValues = z.infer<typeof resetPasswordServerSchema>;

export const changePasswordServerSchema = z
  .object({
    currentPassword: requiredPasswordSchema,
    newPassword: passwordSchema,
    revokeOtherSessions: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.currentPassword === data.newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New password must be different from current password.",
        path: ["newPassword"],
      });
    }
  });

export type ChangePasswordServerValues = z.infer<typeof changePasswordServerSchema>;

export { changePasswordSchema, resetPasswordSchema };
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

import { z } from "zod";

const passwordErrorMessage = "Password must be at least 8 characters";
const confirmPasswordErrorMessage = "Please confirm your password";

export const passwordSchema = z.string().trim().min(8, passwordErrorMessage);
export const requiredPasswordSchema = z.string().trim().min(1, "Password is required");

export const signUpPasswordFieldsSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string().trim().min(1, confirmPasswordErrorMessage),
});

export const signUpPasswordSchema = signUpPasswordFieldsSchema.superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
});

export const changePasswordSchema = z
  .object({
    currentPassword: requiredPasswordSchema,
    newPassword: passwordSchema,
    confirmNewPassword: z.string().trim().min(1, "Please confirm your new password"),
  })
  .superRefine((data, ctx) => {
    if (data.currentPassword === data.newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New password must be different from current password.",
        path: ["newPassword"],
      });
    }

    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New passwords do not match.",
        path: ["confirmNewPassword"],
      });
    }
  });

export const optionalChangePasswordFieldsSchema = z.object({
  currentPassword: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
  newPassword: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: passwordErrorMessage,
    }),
  confirmNewPassword: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
});

export const optionalChangePasswordSchema = optionalChangePasswordFieldsSchema.superRefine(
  (data, ctx) => {
    const hasCurrent = !!data.currentPassword;
    const hasNew = !!data.newPassword;
    const hasConfirm = !!data.confirmNewPassword;
    const isChangingPassword = hasCurrent || hasNew || hasConfirm;

    if (!isChangingPassword) return;

    if (!hasCurrent) {
      ctx.addIssue({
        code: "custom",
        message: "Enter your current password.",
        path: ["currentPassword"],
      });
    }

    if (!hasNew) {
      ctx.addIssue({
        code: "custom",
        message: "Enter a new password.",
        path: ["newPassword"],
      });
    }

    if (!hasConfirm) {
      ctx.addIssue({
        code: "custom",
        message: "Confirm your new password.",
        path: ["confirmNewPassword"],
      });
    }

    if (hasCurrent && hasNew && data.currentPassword === data.newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New password must be different from current password.",
        path: ["newPassword"],
      });
    }

    if (hasNew && hasConfirm && data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New passwords do not match.",
        path: ["confirmNewPassword"],
      });
    }
  }
);

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmNewPassword: z.string().trim().min(1, "Please confirm your new password"),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New passwords do not match.",
        path: ["confirmNewPassword"],
      });
    }
  });

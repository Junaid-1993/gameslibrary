import { z } from "zod";

export const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => !val || val.length >= 3, {
      message: "Please enter at least 3 characters for your first name.",
    })
    .refine((val) => !val || val.length <= 50, {
      message: "First name must be 50 characters or fewer.",
    }),
  lastName: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => !val || val.length >= 3, {
      message: "Please enter at least 3 characters for your last name.",
    })
    .refine((val) => !val || val.length <= 50, {
      message: "First name must be 50 characters or fewer.",
    }),
  userName: z
    .string()
    .trim()
    .min(3, "Choose a username with at least 3 characters.")
    .max(20, "Usernames can be up to 20 characters long."),

  tagline: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: "Your tagline is a little short — try at least 10 characters.",
    })
    .refine((val) => !val || val.length <= 200, {
      message: "Your tagline can be up to 200 characters.",
    }),
  tags: z.array(z.string()).max(4).optional(),
  visibility: z.string(),
});

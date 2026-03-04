import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import {
  signInServerSchema,
  SignInServerValues,
  signUpServerSchema,
  SignUpServerValues,
} from "@/app/Schema/auth";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { z } from "zod";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  emailAndPassword: { enabled: true },

  hooks: {
    // Run this before the request reaches the endpoint
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const body: SignUpServerValues = ctx.body;

        // Server-side Zod validation
        const validation = signUpServerSchema.safeParse(body);

        if (!validation.success) {
          throw new APIError("BAD_REQUEST", { message: "Validation failed" });
        }

        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [{ email: validation.data.email }, { name: validation.data.name }],
          },
          select: { email: true, name: true },
        });

        if (existingUser?.email === validation.data.email) {
          throw new APIError("BAD_REQUEST", { message: "This email is already taken." });
        }

        if (existingUser?.name === validation.data.name) {
          throw new APIError("BAD_REQUEST", { message: "This username is already taken." });
        }
      }

      if (ctx.path === "/sign-in/email") {
        const body: SignInServerValues = ctx.body;
        const validation = signInServerSchema.safeParse(body);

        if (!validation.success) {
          throw new APIError("BAD_REQUEST", { message: "Validation failed" });
        }

        const identifier = validation.data.email.trim();
        const isEmail = z.string().email().safeParse(identifier).success;

        if (!isEmail) {
          // Better Auth expects email on this endpoint, so resolve username -> email here.
          const users = await prisma.user.findMany({
            where: { name: identifier },
            select: { email: true },
            take: 2,
          });

          if (users.length !== 1) {
            throw new APIError("UNAUTHORIZED", {
              message: "Invalid email/username or password.",
            });
          }

          (ctx.body as { email: string }).email = users[0].email;
        }
      }
    }),
  },
  plugins: [nextCookies()], // Keep this last!
});

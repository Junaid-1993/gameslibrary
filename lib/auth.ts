import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import {
  changePasswordServerSchema,
  ChangePasswordServerValues,
  forgotPasswordRequestSchema,
  ForgotPasswordRequestValues,
  resetPasswordServerSchema,
  ResetPasswordServerValues,
  signInServerSchema,
  SignInServerValues,
  signUpServerSchema,
  SignUpServerValues,
} from "@/app/Schema/auth";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { z } from "zod";
import { after } from "next/server";
import nodemailer from "nodemailer";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.ETHEREAL_USER, // Your Ethereal username
    pass: process.env.ETHEREAL_PASS, // Your Ethereal password
  },
});
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      after(async () => {
        const info = await transporter.sendMail({
          from: '"GamesLibrary" <no-reply@gameslibrary.com>',
          to: user.email,
          subject: "Reset your password",
          html: `<p>Click the <a href="${url}" target="_blank">link</a> to reset your password:</p>`,
        });

        console.log("Email sent! Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // Our email sending function, use 'waitUntil' On serverless platforms like vercel to prevent 'timing attacks'.
      // Use after() to send the email in the background
      after(async () => {
        const info = await transporter.sendMail({
          from: '"GamesLibrary" <no-reply@gameslibrary.com>',
          to: user.email,
          subject: "Verify your email",
          html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
        });

        console.log("Email sent! Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
    },
  },

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

        // To check email and username is not already taken
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
        const isEmail = z.email().safeParse(identifier).success;

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

      if (ctx.path === "/request-password-reset") {
        const body: ForgotPasswordRequestValues = ctx.body;
        const validation = forgotPasswordRequestSchema.safeParse(body);

        if (!validation.success) {
          throw new APIError("BAD_REQUEST", { message: "Validation failed" });
        }
      }

      if (ctx.path === "/reset-password") {
        const body: ResetPasswordServerValues = ctx.body;
        const validation = resetPasswordServerSchema.safeParse(body);

        if (!validation.success) {
          throw new APIError("BAD_REQUEST", { message: "Validation failed" });
        }
      }

      if (ctx.path === "/change-password") {
        const body: ChangePasswordServerValues = ctx.body;
        const validation = changePasswordServerSchema.safeParse(body);

        if (!validation.success) {
          throw new APIError("BAD_REQUEST", { message: "Validation failed" });
        }
      }
    }),
  },
  plugins: [nextCookies()], // Keep this last!
});

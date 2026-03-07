"use client";

import { forgotPasswordRequestSchema, ForgotPasswordRequestValues } from "@/app/Schema/auth";
import Brand from "@/app/components/Brand";
import LinkWithArrow from "@/app/components/LinkWithArrow";
import { AnimatedErrorMessage } from "@/app/components/gamedetails/form/ReviewFormWithPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordReset } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function page() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordRequestValues>({
    resolver: zodResolver(forgotPasswordRequestSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordRequestValues) => {
    const { error } = await requestPasswordReset({
      email: data.email,
      redirectTo: `/reset-password`,
    });

    if (error) {
      const rawMessage = error.message || "Failed to request password reset";
      const message = rawMessage.toLowerCase();

      if (message.includes("email")) {
        setError("email", {
          type: "server",
          message: rawMessage,
        });
        return;
      }

      if (message.includes("validation")) {
        setError("email", {
          type: "server",
          message: "Please enter a valid email address.",
        });
        return;
      }

      setError("root", {
        type: "server",
        message: rawMessage,
      });
      return;
    }

    setSubmittedEmail(data.email);
  };

  return (
    <div className="h-screen max-h-screen w-full overflow-hidden lg:flex">
      <div className="flex h-full flex-col overflow-y-auto px-8 py-4 lg:w-1/3 xl:py-8">
        <div>
          <LinkWithArrow
            href="/signin"
            title="Back To Sign In"
            arrowDirection="left"
            className="text-primary-300 hover:text-primary-500 border-none !pl-0 sm:!pl-3"
          />
        </div>

        <div className="mx-auto my-6 grid w-full max-w-96 gap-4 text-center lg:my-4 lg:gap-2">
          <div className="flex justify-center">
            <Brand isFooter />
          </div>

          <div>
            <h3 className="font-space-grotesk text-xl font-medium xl:text-[1.375]">
              Forgot Password
            </h3>
            <p className="text-secondary sm:mt-1">
              Enter your account email and we&apos;ll send you a reset link.
            </p>
          </div>

          <div>
            {submittedEmail ? (
              <div className="mt-4 grid gap-4 text-left">
                <div className="border-border-400 bg-primary-900/20 rounded-xl border p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary-400 mt-0.5 h-5 w-5 shrink-0" />
                    <div className="grid gap-1">
                      <p className="font-medium">Check your inbox</p>
                      <p className="text-secondary text-sm">
                        If an account exists for{" "}
                        <span className="text-foreground">{submittedEmail}</span>, you&apos;ll
                        receive a password reset link shortly.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={() => setSubmittedEmail(null)}
                >
                  Send Another Link
                </Button>

                <Link href="/signin" className="text-primary-400 text-center text-sm">
                  Back to Sign In
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-4 grid gap-6 lg:gap-5"
              >
                {errors.root && (
                  <p className="text-danger-300 text-center text-sm font-medium">
                    {errors.root.message}
                  </p>
                )}

                <div className="grid items-center gap-2 text-left">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Input
                      type="text"
                      inputMode="email"
                      id="email"
                      {...register("email")}
                      className="border-border-400 focus-visible:ring-ring/35 h-10 pr-10"
                      placeholder="Enter your email address"
                      autoComplete="email"
                    />
                    <Mail className="text-secondary pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                  </div>

                  <AnimatedErrorMessage className="!mt-0.5 text-left">
                    {errors.email?.message}
                  </AnimatedErrorMessage>
                </div>

                <div className="mt-1 grid gap-3">
                  <Button
                    variant="glDefault"
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </Button>

                  <Link href="/signin" className="text-primary-400 text-center text-sm">
                    Back to Sign In
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 xl:mt-auto">
          <Link href="#" className="text-primary-400 text-sm">
            Terms of Service
          </Link>
          <Link href="#" className="text-primary-400 text-sm">
            Privacy Policy
          </Link>
        </div>
      </div>

      <div className="relative hidden h-full bg-[url(/signin.jpg)] bg-cover bg-center bg-no-repeat after:absolute after:inset-0 after:z-10 after:bg-black/60 lg:flex lg:w-2/3 lg:grow">
        <div className="relative z-20 flex h-full w-full items-center justify-center px-6">
          <div className="max-w-xl space-y-4">
            <p className="font-space-grotesk text-4xl font-bold text-white">
              Secure your account and get back to your library.
            </p>
            <p className="text-primary-100 text-base">
              We&apos;ll send a secure reset link so you can create a new password and continue
              where you left off.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

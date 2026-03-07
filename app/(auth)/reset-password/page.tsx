"use client";

import { resetPasswordSchema, ResetPasswordValues } from "@/app/Schema/auth";
import Brand from "@/app/components/Brand";
import LinkWithArrow from "@/app/components/LinkWithArrow";
import { AnimatedErrorMessage } from "@/app/components/gamedetails/form/ReviewFormWithPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Eye, EyeOff, KeyRound } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isResetComplete, setIsResetComplete] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordValues) => {
    if (!token) {
      setError("root", {
        type: "server",
        message: "Missing or invalid reset token. Please request a new reset link.",
      });
      return;
    }

    const { error } = await resetPassword({
      newPassword: data.newPassword,
      token,
    });

    if (error) {
      const rawMessage = error.message || "Failed to reset password";
      const message = rawMessage.toLowerCase();

      if (message.includes("token")) {
        setError("root", {
          type: "server",
          message: "This reset link is invalid or expired. Please request a new one.",
        });
        return;
      }

      if (message.includes("password")) {
        setError("newPassword", {
          type: "server",
          message: rawMessage,
        });
        return;
      }

      setError("root", {
        type: "server",
        message: rawMessage,
      });
      return;
    }

    setIsResetComplete(true);
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
              Reset Password
            </h3>
            <p className="text-secondary sm:mt-1">Create a new secure password for your account.</p>
          </div>

          <div>
            {isResetComplete ? (
              <div className="mt-4 grid gap-4 text-left">
                <div className="border-border-400 bg-primary-900/20 rounded-xl border p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary-400 mt-0.5 h-5 w-5 shrink-0" />
                    <div className="grid gap-1">
                      <p className="font-medium">Password updated</p>
                      <p className="text-secondary text-sm">
                        Your password has been reset successfully. You can now sign in with your new
                        password.
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/signin">
                  <Button variant="glDefault" type="button" className="w-full">
                    Go to Sign In
                  </Button>
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
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      {...register("newPassword")}
                      className="border-border-400 focus-visible:ring-ring/35 h-10 pr-20"
                      placeholder="Enter new password"
                      autoComplete="new-password"
                    />
                    <div className="pointer-events-none absolute top-1/2 right-10 -translate-y-1/2">
                      <KeyRound className="text-secondary h-4 w-4" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="text-secondary hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                      aria-label={showNewPassword ? "Hide password" : "Show password"}
                      aria-pressed={showNewPassword}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <AnimatedErrorMessage className="!mt-0.5 text-left">
                    {errors.newPassword?.message}
                  </AnimatedErrorMessage>
                </div>

                <div className="grid items-center gap-2 text-left">
                  <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmNewPassword"
                      {...register("confirmNewPassword")}
                      className="border-border-400 focus-visible:ring-ring/35 h-10 pr-20"
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                    />
                    <div className="pointer-events-none absolute top-1/2 right-10 -translate-y-1/2">
                      <KeyRound className="text-secondary h-4 w-4" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="text-secondary hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      aria-pressed={showConfirmPassword}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <AnimatedErrorMessage className="!mt-0.5 text-left">
                    {errors.confirmNewPassword?.message}
                  </AnimatedErrorMessage>
                </div>

                <div className="mt-1 grid gap-3">
                  <Button
                    variant="glDefault"
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Password"}
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
              A stronger password keeps your profile secure.
            </p>
            <p className="text-primary-100 text-base">
              Use a unique password with at least 8 characters to protect your account and your
              game library.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

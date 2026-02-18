"use client";

import Brand from "@/app/components/Brand";
import LinkWithArrow from "@/app/components/LinkWithArrow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpValues } from "@/app/Schema/auth";
import { AnimatedErrorMessage } from "@/app/components/gamedetails/form/ReviewFormWithPreview";

export default function page() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpValues) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // 1. Specifically handle 409 Conflict for username and email
        if (response.status === 409) {
          const field = result.field as keyof SignUpValues; // "username" or "email"
          setError(field, {
            type: "server",
            message: result.message || `This ${field} is already taken`,
          });
          return;
        }

        // 2. Handle 400 Bad Request (Validation errors)
        if (response.status === 400 && result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            setError(field as keyof SignUpValues, {
              type: "server",
              message: (messages as string[])[0],
            });
          });
          return;
        }

        // 3. Fallback for other errors (500, etc.)
        setError("root", { message: result.message || "Registration failed" });
        return;
      }

      alert("Account created! Redirecting...");
      // router.push("/signin");
    } catch (err) {
      setError("root", { message: "Something went wrong. Try again." });
    }
  };

  return (
    <div className="h-screen max-h-screen w-full overflow-hidden lg:flex">
      <div className="h-full overflow-y-auto px-8 py-4 lg:w-1/3 xl:py-8">
        <div>
          <LinkWithArrow
            href="/"
            title="Back To Home"
            arrowDirection="left"
            className="text-primary-300 hover:text-primary-500 border-none !pl-0 sm:!pl-3"
          />
        </div>
        <div className="mx-auto my-6 grid max-w-96 gap-4 text-center lg:my-4 lg:gap-2">
          <div className="flex justify-center">
            <Brand isFooter />
          </div>
          <div>
            <h3 className="font-space-grotesk text-xl font-medium xl:text-[1.375]">
              Create Your Account
            </h3>
            <p className="text-secondary sm:mt-1">Start building your game library today.</p>
          </div>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 grid gap-6 lg:gap-4 xl:mt-6 xl:gap-5"
            >
              <div className="grid items-center gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  {...register("username")}
                  className="border-border-400 focus-visible:ring-ring/35 h-10"
                  placeholder="Choose username"
                />
                <AnimatedErrorMessage className="!mt-0.5 text-left">
                  {errors.username?.message}
                </AnimatedErrorMessage>
              </div>
              <div className="grid items-center gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="border-border-400 focus-visible:ring-ring/35 h-10"
                  placeholder="Enter your email address"
                />

                <AnimatedErrorMessage className="!mt-0.5 text-left">
                  {errors.email?.message}
                </AnimatedErrorMessage>
              </div>
              <div className="grid items-center gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="border-border-400 focus-visible:ring-ring/35 h-10"
                  placeholder="Enter your password"
                />

                <AnimatedErrorMessage className="!mt-0.5 text-left">
                  {errors.password?.message}
                </AnimatedErrorMessage>
              </div>
              <div className="grid items-center gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirm-password"
                  {...register("confirmPassword")}
                  className="border-border-400 focus-visible:ring-ring/35 h-10"
                  placeholder="Enter your password again"
                />

                <AnimatedErrorMessage className="!mt-0.5 text-left">
                  {errors.confirmPassword?.message}
                </AnimatedErrorMessage>
              </div>
              <div className="mt-2 grid gap-3 lg:gap-2">
                <Button
                  variant="glDefault"
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  Sign up
                </Button>
                <span>or</span>
                <Button variant="outline" type="button" className="w-full cursor-pointer">
                  <Image src="/icons/google-icon.svg" alt="Google Icon" width={20} height={20} />
                  Continue with Google
                </Button>
              </div>
              <div className="mt-2 flex items-center justify-center gap-6">
                <p className="text-secondary text-sm">Already have an account?</p>
                <Link href="/signin" className="text-primary-400 text-sm">
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-6 xl:mt-10">
          <Link href="#" className="text-primary-400 text-sm">
            Terms of Service
          </Link>
          <Link href="#" className="text-primary-400 text-sm">
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className="relative hidden h-full bg-[url(/signup.jpg)] bg-cover bg-center bg-no-repeat after:absolute after:inset-0 after:z-10 after:bg-black/60 lg:flex lg:w-2/3 lg:grow">
        <div className="relative z-20 flex h-full w-full items-center justify-center px-6">
          <p className="font-space-grotesk text-4xl font-bold text-white">
            Track. Share. Level Up Your Game Library.
          </p>
        </div>
      </div>
    </div>
  );
}

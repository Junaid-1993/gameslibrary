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
import { signInSchema, SignInValues } from "@/app/Schema/auth";
import { AnimatedErrorMessage } from "@/app/components/gamedetails/form/ReviewFormWithPreview";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

export default function page() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: SignInValues) => {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // 1. Handle 401 Unauthorized (Invalid Email/Username or Password)
        if (response.status === 401) {
          // We set the error on the root to show a general message at the top/bottom
          // OR you can set it on 'identifier' to highlight the input
          setError("root", {
            message: result.message || "Invalid email/username or password.",
          });
          return;
        }

        // 2. Handle 400 Bad Request (Server-side Zod validation fails)
        if (response.status === 400 && result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            setError(field as keyof SignInValues, {
              type: "server",
              // We take the first message from the array
              message: Array.isArray(messages) ? messages[0] : "Invalid input",
            });
          });
          return;
        }

        // 3. Fallback for 500 or other errors
        setError("root", { message: result.message || "Something went wrong on our end." });
        return;
      }

      // Success!
      alert("Login successful! Redirecting...");
      // router.push("/dashboard");
    } catch (err) {
      // Handle Network/Fetch errors
      setError("root", { message: "Network error. Please check your connection." });
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
            <h3 className="font-space-grotesk text-xl font-medium xl:text-[1.375]">Welcome Back</h3>
            <p className="text-secondary sm:mt-1">
              Log in to manage your game collection and connect with fellow gamers.
            </p>
          </div>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 grid gap-6 lg:gap-4 xl:mt-6 xl:gap-5"
            >
              {errors.root && (
                <p className="text-danger-300 text-center text-sm font-medium">
                  {errors.root.message}
                </p>
              )}

              <div className="grid items-center gap-2">
                <Label htmlFor="identifier">Email or Username</Label>
                <Input
                  id="identifier"
                  type="text" // Keep as text to allow usernames
                  inputMode="email" // Optimizes mobile keyboard without strict validation
                  {...register("identifier")}
                  className="border-border-400 focus-visible:ring-ring/35 h-10"
                  placeholder="Email address or username"
                  autoComplete="username" // Helps password managers
                />

                <AnimatedErrorMessage className="!mt-0.5 text-left">
                  {errors.identifier?.message}
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
              <div className="flex justify-between gap-2">
                <div>
                  <FieldGroup className="mx-auto w-32">
                    <Field orientation="horizontal">
                      <Checkbox
                        id="remember"
                        className="border-border-400"
                        onCheckedChange={(checked) => {
                          register("remember").onChange({
                            target: { value: checked, name: "remember" },
                          });
                        }}
                      />
                      <FieldLabel htmlFor="remember" className="text-accent-400">
                        Remember me
                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                </div>
                <Link href="#" className="text-primary-400 text-sm">
                  Forget Password?
                </Link>
              </div>
              <div className="mt-2 grid gap-3 lg:gap-2">
                <Button
                  variant="glDefault"
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  Sign in
                </Button>
                <span>or</span>
                <Button variant="outline" type="button" className="w-full cursor-pointer">
                  <Image src="/icons/google-icon.svg" alt="Google Icon" width={20} height={20} />
                  Continue with Google
                </Button>
              </div>
              <div className="mt-2 flex items-center justify-center gap-6">
                <p className="text-secondary text-sm">Don’t have an account?</p>
                <Link href="/signup" className="text-primary-400 text-sm">
                  Sign Up
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
      <div className="relative hidden h-full bg-[url(/signin.jpg)] bg-cover bg-center bg-no-repeat after:absolute after:inset-0 after:z-10 after:bg-black/60 lg:flex lg:w-2/3 lg:grow">
        <div className="relative z-20 flex h-full w-full items-center justify-center px-6">
          <p className="font-space-grotesk text-4xl font-bold text-white">
            Track. Share. Level Up Your Game Library.
          </p>
        </div>
      </div>
    </div>
  );
}

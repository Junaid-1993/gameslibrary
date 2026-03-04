"use client";

import { signInSchema, SignInValues } from "@/app/Schema/auth";
import Brand from "@/app/components/Brand";
import LinkWithArrow from "@/app/components/LinkWithArrow";
import { AnimatedErrorMessage } from "@/app/components/gamedetails/form/ReviewFormWithPreview";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
    // Send identifier in `email`; server hook resolves username to email when needed.
    const { error } = await signIn.email({
      email: data.identifier.trim(),
      password: data.password,
      rememberMe: data.remember,
    });

    if (error) {
      const rawMessage = error.message || "Sign in failed";
      const message = rawMessage.toLowerCase();

      if (
        message.includes("invalid") ||
        message.includes("password") ||
        message.includes("credential") ||
        message.includes("user")
      ) {
        setError("root", {
          type: "server",
          message: "Invalid email/username or password.",
        });
        return;
      }

      if (message.includes("validation")) {
        setError("identifier", {
          type: "server",
          message: "Enter a valid email or username.",
        });
        return;
      }

      setError("root", {
        type: "server",
        message: rawMessage,
      });
      return;
    }

    // If we reach here, the session is created and cookies are set!
    router.push("/profile/stats");
  };

  return (
    <div className="h-screen max-h-screen w-full overflow-hidden lg:flex">
      <div className="flex h-full flex-col overflow-y-auto px-8 py-4 lg:w-1/3 xl:py-8">
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
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password")}
                    className="border-border-400 focus-visible:ring-ring/35 h-10 pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-secondary hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

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
          <p className="font-space-grotesk text-4xl font-bold text-white">
            Track. Share. Level Up Your Game Library.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { signUpSchema, SignUpValues } from "@/app/Schema/auth";
import Brand from "@/app/components/Brand";
import LinkWithArrow from "@/app/components/LinkWithArrow";
import { AnimatedErrorMessage } from "@/app/components/gamedetails/form/ReviewFormWithPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    // Use the authClient instead of fetch()
    const { error } = await signUp.email({
      name: data.username, // mapping your 'username' to 'name'
      email: data.email,
      password: data.password,
    });

    if (error) {
      const rawMessage = error.message || "Registration failed";
      const message = rawMessage.toLowerCase();

      if (message.includes("username")) {
        setError("username", { type: "server", message: rawMessage });
        return;
      }

      if (message.includes("email")) {
        setError("email", { type: "server", message: rawMessage });
        return;
      }

      if (message.includes("validation")) {
        setError("root", {
          type: "server",
          message: "Please check your input and try again.",
        });
        return;
      }

      setError("root", { type: "server", message: rawMessage });
      return;
    }

    // If we reach here, the session is created and cookies are set!
    router.push("/profile/stats");
    router.refresh();
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
        <div className="mx-auto my-6 grid w-full max-w-96 gap-4 text-center lg:my-4 lg:gap-2">
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
              {errors.root && (
                <p className="text-danger-300 text-center text-sm font-medium">
                  {errors.root.message}
                </p>
              )}

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
                    className="text-secondary hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
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
              <div className="grid items-center gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    {...register("confirmPassword")}
                    className="border-border-400 focus-visible:ring-ring/35 h-10 pr-10"
                    placeholder="Enter your password again"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="text-secondary hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    aria-pressed={showConfirmPassword}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

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
        <div className="mt-8 flex items-center justify-center gap-6 xl:mt-auto">
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

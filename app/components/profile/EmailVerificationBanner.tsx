"use client";

import { Button } from "@/components/ui/button";
import { CircleAlert, MailCheck } from "lucide-react";

import { sendVerificationEmail, useSession } from "@/lib/auth-client";
import { useState } from "react";

export default function EmailVerificationBanner() {
  const [verificationSent, setVerificationSent] = useState(false);
  const { data: session } = useSession();

  const user = session?.user;

  const handleVerificationEmail = async () => {
    if (!user?.email) return;
    await sendVerificationEmail({
      email: user.email,
      callbackURL: "/profile/stats", // The redirect URL after verification
    });
    setVerificationSent(true);
  };

  return (
    <div className="border-border-400 bg-primary-900/20 rounded-lg border p-4">
      <div className="flex items-start gap-3">
        <CircleAlert className="text-accent-400 mt-0.5 h-5 w-5 shrink-0" />
        <div className="grid gap-2">
          <p className="font-medium">Verify your email address</p>
          <p className="text-sm text-gray-300">
            Your account is not verified yet. Verify your email to improve account security.
          </p>
          {verificationSent && (
            <p className="mt-2 text-xs text-green-300">
              An email is sent to your inbox please check and verify.
            </p>
          )}

          <Button
            variant="outline"
            type="button"
            className="mt-1 w-fit cursor-pointer"
            onClick={() => handleVerificationEmail()}
          >
            <MailCheck />
            <span>Verify your email</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

import Logo from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <Link
        href={"/"}
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-4 left-4",
        })}
      >
        <ArrowLeft className="size-4" /> Back
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href={"/"}
          className="flex items-center gap-2 self-center font-medium"
        >
          <Logo /> <span className="text-2xl font-bold">LMS</span>
        </Link>
        {children}

        <div className="text-muted-foreground self-center text-center text-xs text-balance">
          By clicking continue, you agree to our{" "}
          <span className="text-primary cursor-pointer font-medium hover:underline">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-primary cursor-pointer font-medium hover:underline">
            Privacy Policy
          </span>
        </div>
      </div>
    </div>
  );
}

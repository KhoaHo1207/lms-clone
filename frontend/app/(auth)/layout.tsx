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
          variant: "default",
          className: "absolute top-4 left-4",
        })}
      >
        <ArrowLeft className="size-4" /> Back
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href={"/"} className="flex items-center self-center font-medium">
          <Logo className="h-10 w-auto" />{" "}
          <span className="font-bold">LMS</span>
        </Link>
        {children}

        <div className="text-muted-foreground text-center text-xs text-balance">
          By Clicking continue, you agree to our{" "}
          <Link href={"/terms"} className="hover:text-primary hover:underline">
            Terms of service
          </Link>{" "}
          and{" "}
          <Link
            href={"/privacy"}
            className="hover:text-primary hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}

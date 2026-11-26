import Logo from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/40 relative flex min-h-svh items-center justify-center px-4 py-16">
      <Link
        href="/"
        className={buttonVariants({
          variant: "ghost",
          className: "absolute top-4 left-4",
        })}
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>
      <div className="flex w-full max-w-md flex-col gap-8">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Logo className="h-9 w-auto" />
          <span className="text-lg font-semibold tracking-tight">LMS</span>
        </Link>
        {children}
      </div>
    </div>
  );
}
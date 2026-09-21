import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Book } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <Link
        href={"/"}
        className={buttonVariants({
          variant: "ghost",
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
          <div className="bg-primary rounded-md p-2">
            <Book className="text-primary-foreground size-4" />
          </div>
          ThomasHoLMS.
        </Link>
        {children}

        <div className="text-muted-foreground text-center text-xs text-balance">
          By clicking continue, you agree to our{" "}
          <span className="hover:text-primary font-bold hover:underline">
            Term of service
          </span>{" "}
          and{" "}
          <span className="hover:text-primary font-bold hover:underline">
            Privacy Policy
          </span>
        </div>
      </div>
    </div>
  );
}

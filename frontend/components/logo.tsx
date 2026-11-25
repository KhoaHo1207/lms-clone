import { cn } from "cn";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={"/logo.png"}
      alt="Logo"
      width={100}
      height={100}
      priority
      className={cn("h-auto w-auto", className)}
    />
  );
}

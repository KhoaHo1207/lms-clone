import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { Loader2 } from "lucide-react";

interface AuthButtonProps {
  variant?: "default" | "outline" | "ghost" | "link";
  label: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}
export default function AuthButton({
  variant = "default",
  label,
  className,
  type = "button",
  loading = false,
}: AuthButtonProps) {
  return (
    <Button
      className={cn("flex items-center justify-center gap-2", className)}
      variant={variant}
      type={type}
      disabled={loading}
    >
      {loading && <Loader2 className="animate-spin" />}
      {label}
    </Button>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useLogout } from "@/hooks/use-logout";
import { ApiError } from "@/lib/api";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const logoutMutation = useLogout();

  return (
    <Button
      variant="outline"
      disabled={logoutMutation.isPending}
      onClick={() => {
        logoutMutation.mutate(undefined, {
          onSuccess: (result) => {
            toast.add({
              type: "success",
              title: "Logged out",
              description: result.message,
            });
            router.replace("/login");
          },
          onError: (error) => {
            toast.add({
              type: "error",
              title: "Logout failed",
              description:
                error instanceof ApiError
                  ? error.message
                  : "Something went wrong",
            });
          },
        });
      }}
    >
      <LogOut />
      {logoutMutation.isPending ? "Signing out..." : "Log out"}
    </Button>
  );
}

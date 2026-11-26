"use client";

import { LogoutButton } from "@/components/logout-button";
import { ModeToggle } from "@/components/mode-toggle";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ApiError } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function HomeHeader() {
  const router = useRouter();
  const { data, isError, error } = useCurrentUser();
  const user = data?.data;

  useEffect(() => {
    if (isError && error instanceof ApiError && error.status === 401) {
      router.replace("/login");
    }
  }, [error, isError, router]);

  return (
    <header className="flex items-center justify-between gap-4 p-4">
      <div className="min-w-0">
        {user ? (
          <>
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="text-muted-foreground truncate text-xs">
              {user.email}
            </p>
          </>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <LogoutButton />
      </div>
    </header>
  );
}

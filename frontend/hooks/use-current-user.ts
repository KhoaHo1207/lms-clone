"use client";

import { ApiError } from "@/lib/api";
import { currentUserQueryKey } from "@/lib/auth";
import { getMe } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: getMe,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 401) return false;
      return failureCount < 1;
    },
  });
}

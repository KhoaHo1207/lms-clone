"use client";

import { currentUserQueryKey } from "@/lib/auth";
import { logout } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: currentUserQueryKey });
    },
  });
}

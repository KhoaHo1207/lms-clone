"use client";

import { currentUserQueryKey } from "@/lib/auth";
import { login } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      queryClient.setQueryData(currentUserQueryKey, result);
    },
  });
}

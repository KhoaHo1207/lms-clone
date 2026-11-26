"use client";

import { verifyEmail } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyEmail,
  });
}

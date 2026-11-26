"use client";

import { register } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
    mutationFn: register,
  });
}

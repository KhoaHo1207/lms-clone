import { api } from "@/lib/api";
import type { LoginInput } from "@/schemas/login.schema";
import type { RegisterInput } from "@/schemas/register.schema";
import type { VerifyEmailInput } from "@/schemas/verify-email.schema";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
};

export type AuthUserResponse = {
  success: true;
  message: string;
  data: AuthUser;
};

export type AuthMessageResponse = {
  success: true;
  message: string;
};

export function login(input: LoginInput) {
  return api<AuthUserResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function getMe() {
  return api<AuthUserResponse>("/api/v1/auth/me");
}

export function register(input: RegisterInput) {
  return api<AuthMessageResponse>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function verifyEmail(input: VerifyEmailInput) {
  return api<AuthMessageResponse>("/api/v1/auth/verify-email", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function resendOtp(email: string) {
  return api<AuthMessageResponse>("/api/v1/auth/resend-otp", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function logout() {
  return api<AuthMessageResponse>("/api/v1/auth/logout", {
    method: "POST",
  });
}

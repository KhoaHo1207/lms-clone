import { randomInt } from "node:crypto";

export const OTP_TTL_MS = 10 * 60 * 1000;
export const OTP_RESEND_COOLDOWN_MS = 60 * 1000;

export const createOtp = () => randomInt(100000, 1000000).toString();

export const createOtpExpiry = () => new Date(Date.now() + OTP_TTL_MS);

export const isOtpResendCoolingDown = (expiresAt: Date | null | undefined) => {
  if (!expiresAt) return false;

  const sentAt = expiresAt.getTime() - OTP_TTL_MS;
  return Date.now() - sentAt < OTP_RESEND_COOLDOWN_MS;
};

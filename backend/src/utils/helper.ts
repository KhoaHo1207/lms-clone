import bcrypt from "bcryptjs";
import { timingSafeEqual } from "node:crypto";

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const compareOtp = (
  storedOtp: string | null | undefined,
  otp: string,
) => {
  if (!storedOtp) return false;

  const stored = Buffer.from(storedOtp);
  const received = Buffer.from(otp);

  if (stored.length !== received.length) return false;

  return timingSafeEqual(stored, received);
};

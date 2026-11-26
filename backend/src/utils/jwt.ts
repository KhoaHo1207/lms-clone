import { ENV } from "@/config/env.js";
import { AppError } from "@/utils/app-error.js";
import jwt, { type SignOptions } from "jsonwebtoken";

export type AccessTokenPayload = {
  userId: string;
  email: string;
  role: string;
};

const signOptions: SignOptions = {
  expiresIn: ENV.JWT_EXPIRES_IN as Exclude<SignOptions["expiresIn"], undefined>,
};

const durationMs: Record<string, number> = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
};

const toMaxAge = (value: string) => {
  const match = /^(\d+)([smhd])$/.exec(value);
  const amount = Number(match?.[1]);
  const unit = match?.[2];
  const multiplier = unit ? durationMs[unit] : undefined;

  if (!amount || !multiplier) return durationMs.h ?? 60 * 60 * 1000;

  return amount * multiplier;
};

export const accessTokenMaxAge = toMaxAge(ENV.JWT_EXPIRES_IN);

export const generateAccessToken = (payload: AccessTokenPayload) => {
  return jwt.sign(payload, ENV.JWT_SECRET, signOptions);
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  const decoded = jwt.verify(token, ENV.JWT_SECRET);

  if (
    typeof decoded === "string" ||
    typeof decoded.userId !== "string" ||
    typeof decoded.email !== "string" ||
    typeof decoded.role !== "string"
  ) {
    throw new AppError("Invalid token", 401);
  }

  return {
    userId: decoded.userId,
    email: decoded.email,
    role: decoded.role,
  };
};

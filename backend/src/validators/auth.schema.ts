import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .min(2, {
        message: "Name must be at least 2 characters",
      })
      .max(50, {
        message: "Name must be less than 50 characters",
      }),
    email: z.string({ error: "Email is required" }).email({
      message: "Invalid email address",
    }),
    password: z
      .string({ error: "Password is required" })
      .min(8, {
        message: "Password must be at least 8 characters",
      })
      .max(32, {
        message: "Password must be less than 32 characters",
      }),
  })
  .strict();

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z
  .object({
    email: z.string({ error: "Email is required" }).email({
      message: "Invalid email address",
    }),
    password: z
      .string({ error: "Password is required" })
      .min(8, {
        message: "Password must be at least 8 characters",
      })
      .max(32, {
        message: "Password must be less than 32 characters",
      }),
  })
  .strict();

export type LoginSchema = z.infer<typeof loginSchema>;

export const verifyEmailSchema = z
  .object({
    email: z.string({ error: "Email is required" }).email({
      message: "Invalid email address",
    }),
    otp: z
      .string({ error: "OTP is required" })
      .min(6, {
        message: "OTP must be 6 characters",
      })
      .max(6, {
        message: "OTP must be 6 characters",
      }),
  })
  .strict();

export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;

export const resendOtpSchema = z
  .object({
    email: z.string({ error: "Email is required" }).email({
      message: "Invalid email address",
    }),
  })
  .strict();

export type ResendOtpSchema = z.infer<typeof resendOtpSchema>;

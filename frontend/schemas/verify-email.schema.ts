import { z } from "zod";

export const verifyEmailSchema = z
  .object({
    email: z.string({ error: "Email is required" }).email({
      message: "Invalid email address",
    }),
    otp: z
      .string({ error: "OTP is required" })
      .regex(/^\d{6}$/, {
        message: "OTP must be 6 digits",
      }),
  })
  .strict();

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

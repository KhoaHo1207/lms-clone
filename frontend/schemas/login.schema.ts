import { z } from "zod";

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

export type LoginInput = z.infer<typeof loginSchema>;

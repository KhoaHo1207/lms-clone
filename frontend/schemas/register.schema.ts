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

export type RegisterInput = z.infer<typeof registerSchema>;

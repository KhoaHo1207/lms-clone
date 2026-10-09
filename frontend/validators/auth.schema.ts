import { z } from "zod";

export const signInSchema = z
  .object({
    email: z.string({ error: "Email is required" }).email({
      error: "Invalid email address",
    }),
    password: z.string({ error: "Password is required" }).min(8, {
      error: "Password must be at least 8 characters",
    }),
  })
  .strict();

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    name: z.string({ error: "Name is required" }).min(1, {
      error: "Name is required",
    }),
    email: z.string({ error: "Email is required" }).email({
      error: "Invalid email address",
    }),
    password: z.string({ error: "Password is required" }).min(8, {
      error: "Password must be at least 8 characters",
    }),
  })
  .strict();

export type SignUpSchema = z.infer<typeof signUpSchema>;

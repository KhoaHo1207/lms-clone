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
    name: z.string({ error: "Name is required" }).min(3, {
      error: "Name must be at least 3 characters",
    }),
    email: z.string({ error: "Email is required" }).email({
      error: "Invalid email address",
    }),
    password: z.string({ error: "Password is required" }).min(8, {
      error: "Password must be at least 8 characters",
    }),
    confirmPassword: z
      .string({ error: "Confirm password is required" })
      .min(8, {
        error: "Confirm password must be at least 8 characters",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .strict();

export type SignUpSchema = z.infer<typeof signUpSchema>;

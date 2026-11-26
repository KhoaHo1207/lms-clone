import {
  login,
  logout,
  me,
  register,
  resendOtp,
  verifyEmail,
} from "@/controllers/auth.controller.js";
import {
  arcjetAuthenticated,
  arcjetLogin,
  arcjetRegister,
  arcjetResendOtp,
  arcjetVerifyEmail,
} from "@/middlewares/arcjet.js";
import { requireAuth } from "@/middlewares/require-auth.js";
import { validate } from "@/middlewares/validate.js";
import {
  loginSchema,
  registerSchema,
  resendOtpSchema,
  verifyEmailSchema,
} from "@/validators/auth.schema.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), arcjetRegister, register);
authRouter.post(
  "/verify-email",
  validate(verifyEmailSchema),
  arcjetVerifyEmail,
  verifyEmail,
);
authRouter.post("/resend-otp", validate(resendOtpSchema), arcjetResendOtp, resendOtp);
authRouter.post("/login", validate(loginSchema), arcjetLogin, login);
authRouter.get("/me", arcjetAuthenticated, requireAuth, me);
authRouter.post("/logout", arcjetAuthenticated, logout);
export default authRouter;

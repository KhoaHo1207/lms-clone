import {
  login,
  logout,
  me,
  register,
  resendOtp,
  verifyEmail,
} from "@/controllers/auth.controller.js";
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

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/verify-email", validate(verifyEmailSchema), verifyEmail);
authRouter.post("/resend-otp", validate(resendOtpSchema), resendOtp);
authRouter.post("/login", validate(loginSchema), login);
authRouter.get("/me", requireAuth, me);
authRouter.post("/logout", logout);
export default authRouter;

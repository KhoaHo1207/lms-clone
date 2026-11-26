import { ENV } from "@/config/env.js";
import { asyncHandler } from "@/middlewares/async-handler.js";
import { User } from "@/models/user.model.js";
import { sendWelcomeEmail } from "@/services/mail.service.js";
import { sendResponse } from "@/utils/api-response.js";
import { AppError } from "@/utils/app-error.js";
import {
  clearAccessTokenCookie,
  setAccessTokenCookie,
} from "@/utils/auth-cookie.js";
import { toAuthUser } from "@/utils/auth-user.js";
import { compareOtp, comparePassword, hashPassword } from "@/utils/helper.js";
import { generateAccessToken } from "@/utils/jwt.js";
import {
  createOtp,
  createOtpExpiry,
  isOtpResendCoolingDown,
} from "@/utils/otp.js";
import type { Request, Response } from "express";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const isExistingUser = await User.findOne({ email });

  if (isExistingUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await hashPassword(password);
  const otp = createOtp();

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    otp,
    otpExpiresAt: createOtpExpiry(),
  });

  try {
    await sendWelcomeEmail({
      email: user.email,
      fullName: user.name,
      otp,
    });
  } catch (error) {
    console.error("Send welcome email failed:", error);
  }

  sendResponse(res, 201, {
    success: true,
    message: "User registered successfully",
  });
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email }).select("+otp +otpExpiresAt");

  if (!user) {
    throw new AppError("Invalid or expired OTP", 400);
  }

  if (user.isEmailVerified) {
    throw new AppError("Email already verified", 409);
  }

  const isExpired =
    !user.otpExpiresAt || user.otpExpiresAt.getTime() < Date.now();

  if (isExpired || !compareOtp(user.otp, otp)) {
    throw new AppError("Invalid or expired OTP", 400);
  }

  user.isEmailVerified = true;
  user.otp = null;
  user.otpExpiresAt = null;
  await user.save({ validateModifiedOnly: true });

  sendResponse(res, 200, {
    success: true,
    message: "Email verified successfully",
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }
  if (!user.isEmailVerified) {
    throw new AppError("Email not verified", 403);
  }

  const token = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  setAccessTokenCookie(res, token);

  sendResponse(res, 200, {
    success: true,
    message: "Login successful",
    data: toAuthUser(user),
  });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.auth?.userId;

  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const user = await User.findById(userId);

  if (!user) {
    clearAccessTokenCookie(res);
    throw new AppError("Unauthorized", 401);
  }

  sendResponse(res, 200, {
    success: true,
    message: "Current user",
    data: toAuthUser(user),
  });
});

export const resendOtp = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).select("+otp +otpExpiresAt");
  const sentMessage = "If this email needs verification, a new code has been sent";

  if (!user || user.isEmailVerified) {
    sendResponse(res, 200, {
      success: true,
      message: sentMessage,
    });
    return;
  }

  if (isOtpResendCoolingDown(user.otpExpiresAt)) {
    throw new AppError("Please wait a minute before requesting another code", 429);
  }

  const otp = createOtp();

  await sendWelcomeEmail({
    email: user.email,
    fullName: user.name,
    otp,
    subject: `${ENV.MAIL_FROM_NAME} - Mã xác minh email`,
  });

  user.otp = otp;
  user.otpExpiresAt = createOtpExpiry();
  await user.save({ validateModifiedOnly: true });

  sendResponse(res, 200, {
    success: true,
    message: sentMessage,
  });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  clearAccessTokenCookie(res);

  sendResponse(res, 200, {
    success: true,
    message: "Logged out successfully",
  });
});

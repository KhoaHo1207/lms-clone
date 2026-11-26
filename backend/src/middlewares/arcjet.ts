import {
  loginClient,
  registerClient,
  resendOtpClient,
  shieldClient,
  verifyEmailClient,
} from "@/lib/arcjet.js";
import { asyncHandler } from "@/middlewares/async-handler.js";
import { AppError } from "@/utils/app-error.js";
import type { ArcjetDecision } from "@arcjet/node";
import type { Request, RequestHandler } from "express";

const enforce = (decision: ArcjetDecision) => {
  if (decision.isErrored()) {
    console.error("Arcjet error:", decision.reason.message);
    return;
  }

  if (!decision.isDenied()) return;

  if (decision.reason.isRateLimit()) {
    throw new AppError("Too many requests. Please try again later", 429);
  }

  if (decision.reason.isEmail()) {
    throw new AppError("This email address cannot be used", 400);
  }

  throw new AppError("Request blocked", 403);
};

const readEmail = (req: Request) => {
  const email = req.body?.email;
  return typeof email === "string" ? email : undefined;
};

export const arcjetShield: RequestHandler = asyncHandler(async (req, _res, next) => {
  if (req.path.startsWith("/api/v1/auth")) {
    next();
    return;
  }

  enforce(await shieldClient.protect(req));
  next();
});

export const arcjetRegister: RequestHandler = asyncHandler(async (req, _res, next) => {
  const email = readEmail(req);

  if (!email) {
    throw new AppError("Email is required", 400);
  }

  enforce(await registerClient.protect(req, { email }));
  next();
});

export const arcjetLogin: RequestHandler = asyncHandler(async (req, _res, next) => {
  enforce(await loginClient.protect(req));
  next();
});

export const arcjetVerifyEmail: RequestHandler = asyncHandler(
  async (req, _res, next) => {
    enforce(await verifyEmailClient.protect(req));
    next();
  },
);

export const arcjetResendOtp: RequestHandler = asyncHandler(
  async (req, _res, next) => {
    enforce(await resendOtpClient.protect(req));
    next();
  },
);

export const arcjetAuthenticated: RequestHandler = asyncHandler(
  async (req, _res, next) => {
    enforce(await shieldClient.protect(req));
    next();
  },
);

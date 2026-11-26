import { asyncHandler } from "@/middlewares/async-handler.js";
import { clearAccessTokenCookie } from "@/utils/auth-cookie.js";
import { AppError } from "@/utils/app-error.js";
import { verifyAccessToken, type AccessTokenPayload } from "@/utils/jwt.js";
import type { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      auth?: AccessTokenPayload;
    }
  }
}

const readAccessToken = (req: Request) => {
  const token = req.cookies?.accessToken;
  return typeof token === "string" && token.length > 0 ? token : undefined;
};

export const requireAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = readAccessToken(req);

    if (!token) {
      throw new AppError("Unauthorized", 401);
    }

    try {
      req.auth = verifyAccessToken(token);
    } catch (error) {
      clearAccessTokenCookie(res);
      throw error;
    }

    next();
  },
);

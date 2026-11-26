import { ENV } from "@/config/env.js";
import { accessTokenMaxAge } from "@/utils/jwt.js";
import type { CookieOptions, Response } from "express";

const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export const setAccessTokenCookie = (res: Response, token: string) => {
  res.cookie("accessToken", token, {
    ...accessTokenCookieOptions,
    maxAge: accessTokenMaxAge,
  });
};

export const clearAccessTokenCookie = (res: Response) => {
  res.clearCookie("accessToken", accessTokenCookieOptions);
};

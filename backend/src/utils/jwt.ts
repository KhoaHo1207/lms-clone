import { env } from "@/config/env.js";
import jsonwebtoken from "jsonwebtoken";

export const generateAccessToken = (payload: any) => {
  return jsonwebtoken.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRE,
  });
};

export const verifyAccessToken = (token: string) => {
  return jsonwebtoken.verify(token, env.JWT_ACCESS_SECRET);
};

export const generateRefreshToken = (payload: any) => {
  return jsonwebtoken.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRE,
  });
};

export const verifyRefreshToken = (token: string) => {
  return jsonwebtoken.verify(token, env.JWT_REFRESH_SECRET);
};

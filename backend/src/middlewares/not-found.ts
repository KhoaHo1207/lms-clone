import type { RequestHandler } from "express";
import { AppError } from "@/utils/app-error.js";

export const notFound: RequestHandler = (req, _res, next) => {
  next(new AppError(`Cannot find ${req.method} ${req.originalUrl}`, 404));
};

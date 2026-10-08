import { AppError } from "@/utils/app-error.js";
import type { NextFunction, Request, Response } from "express";

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404));
}

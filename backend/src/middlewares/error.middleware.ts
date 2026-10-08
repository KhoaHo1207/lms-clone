import { env } from "@/config/env.js";
import { AppError } from "@/utils/app-error.js";
import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

function getMongooseError(err: unknown) {
  if (!err || typeof err !== "object") return null;

  const error = err as {
    name?: string;
    code?: number;
    keyValue?: Record<string, unknown>;
    errors?: Record<string, { message: string }>;
    path?: string;
    value?: unknown;
  };

  if (error.name === "CastError") {
    return new AppError(`Invalid ${error.path}: ${String(error.value)}`, 400);
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyValue ?? {})[0] ?? "field";
    return new AppError(`${field} already exists`, 409);
  }

  if (error.name === "ValidationError" && error.errors) {
    const details = Object.values(error.errors).map((item) => item.message);
    return new AppError("Validation failed", 400, details);
  }

  if (error.name === "JsonWebTokenError") {
    return new AppError("Invalid token", 401);
  }

  if (error.name === "TokenExpiredError") {
    return new AppError("Token expired", 401);
  }

  return null;
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let error: AppError;

  if (err instanceof AppError) {
    error = err;
  } else if (err instanceof ZodError) {
    error = new AppError(
      "Validation failed",
      422,
      err.issues.map((issue) => ({
        field: issue.path.join(".") || "root",
        message: issue.message,
      })),
    );
  } else {
    error =
      getMongooseError(err) ??
      new AppError("Internal server error", 500, undefined, false);
  }

  if (!error.isOperational || env.NODE_ENV !== "production") {
    console.error(err);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    ...(error.details !== undefined ? { details: error.details } : {}),
    ...(env.NODE_ENV !== "production" && err instanceof Error
      ? { stack: err.stack }
      : {}),
  });
};

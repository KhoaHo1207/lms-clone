import type { ErrorRequestHandler } from "express";
import { Error as MongooseError } from "mongoose";
import { ZodError } from "zod";
import { AppError } from "@/utils/app-error.js";
import { sendResponse, type FieldError } from "@/utils/api-response.js";

type NormalizedError = {
  statusCode: number;
  message: string;
  errors?: FieldError[];
  isOperational: boolean;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isDuplicateKeyError = (
  err: unknown,
): err is { keyValue?: Record<string, unknown> } =>
  isRecord(err) && err.code === 11000;

const isJsonParseError = (err: unknown): boolean =>
  err instanceof SyntaxError && isRecord(err) && err.type === "entity.parse.failed";

const duplicateKeyMessage = (keyValue: Record<string, unknown> | undefined) => {
  const field = keyValue ? Object.keys(keyValue)[0] : undefined;
  return field ? `${field} already exists` : "Duplicate field value";
};

const normalizeError = (err: unknown): NormalizedError => {
  if (err instanceof AppError) {
    return {
      statusCode: err.statusCode,
      message: err.message,
      isOperational: true,
    };
  }

  if (err instanceof ZodError) {
    return {
      statusCode: 400,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.map(String).join(".") || "body",
        message: issue.message,
      })),
      isOperational: true,
    };
  }

  if (err instanceof MongooseError.ValidationError) {
    return {
      statusCode: 400,
      message: "Validation failed",
      errors: Object.values(err.errors).map((item) => ({
        field: item.path,
        message: item.message,
      })),
      isOperational: true,
    };
  }

  if (err instanceof MongooseError.CastError) {
    return {
      statusCode: 400,
      message: `Invalid ${err.path}`,
      isOperational: true,
    };
  }

  if (isDuplicateKeyError(err)) {
    return {
      statusCode: 409,
      message: duplicateKeyMessage(err.keyValue),
      isOperational: true,
    };
  }

  if (err instanceof Error && err.name === "TokenExpiredError") {
    return {
      statusCode: 401,
      message: "Token expired",
      isOperational: true,
    };
  }

  if (err instanceof Error && err.name === "JsonWebTokenError") {
    return {
      statusCode: 401,
      message: "Invalid token",
      isOperational: true,
    };
  }

  if (isJsonParseError(err)) {
    return {
      statusCode: 400,
      message: "Invalid JSON payload",
      isOperational: true,
    };
  }

  return {
    statusCode: 500,
    message: err instanceof Error ? err.message : "Something went wrong",
    isOperational: false,
  };
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (res.headersSent) {
    console.error(err);
    return;
  }

  const normalized = normalizeError(err);
  const isProduction = process.env.NODE_ENV === "production";
  const hideDetails = isProduction && !normalized.isOperational;

  if (hideDetails) {
    console.error(err);
  }

  const errors = hideDetails ? undefined : normalized.errors;
  const stack =
    !isProduction && err instanceof Error ? err.stack : undefined;

  sendResponse(res, hideDetails ? 500 : normalized.statusCode, {
    success: false,
    message: hideDetails ? "Something went wrong" : normalized.message,
    ...(errors?.length ? { errors } : {}),
    ...(stack ? { stack } : {}),
  });
};

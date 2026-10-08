export class AppError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean;
  readonly details?: unknown;

  constructor(
    message: string,
    statusCode = 400,
    details?: unknown,
    isOperational = true,
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (details !== undefined) {
      this.details = details;
    }

    Error.captureStackTrace?.(this, this.constructor);
  }
}

export const badRequest = (message: string, details?: unknown) =>
  new AppError(message, 400, details);

export const unauthorized = (message = "Unauthorized") =>
  new AppError(message, 401);

export const forbidden = (message = "Forbidden") => new AppError(message, 403);

export const notFound = (message = "Resource not found") =>
  new AppError(message, 404);

export const conflict = (message: string) => new AppError(message, 409);

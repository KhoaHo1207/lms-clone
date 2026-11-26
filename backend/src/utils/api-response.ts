import type { Response } from "express";

export type FieldError = {
  field: string;
  message: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  meta?: PaginationMeta;
  errors?: FieldError[];
  stack?: string;
};

export const buildPagination = (
  page: number,
  limit: number,
  total: number
): PaginationMeta => ({
  page,
  limit,
  total,
  totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
});

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  body: ApiResponse<T>
) => {
  const payload: ApiResponse<T> = {
    success: body.success,
    message: body.message,
  };

  if (body.data !== undefined) {
    payload.data = body.data;
  }

  if (body.meta) {
    payload.meta = body.meta;
  }

  if (body.errors?.length) {
    payload.errors = body.errors;
  }

  if (body.stack) {
    payload.stack = body.stack;
  }

  return res.status(statusCode).json(payload);
};

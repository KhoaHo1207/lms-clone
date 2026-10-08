import { AppError } from "@/utils/app-error.js";
import type { NextFunction, Request, Response } from "express";
import { type ZodType, ZodError } from "zod";

type RequestSchema = {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
};

export function validate(schema: RequestSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      if (schema.params) {
        req.params = schema.params.parse(req.params) as Request["params"];
      }

      if (schema.query) {
        const parsed = schema.query.parse(req.query);
        Object.defineProperty(req, "query", {
          value: parsed,
          writable: true,
          configurable: true,
        });
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(
          new AppError(
            "Validation failed",
            422,
            error.issues.map((issue) => ({
              field: issue.path.join(".") || "root",
              message: issue.message,
            })),
          ),
        );
        return;
      }

      next(error);
    }
  };
}

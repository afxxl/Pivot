import z, { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../../shared/errors/ValidationError";

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.reduce(
          (acc, err) => {
            const field = err.path.join(".");
            acc[field] = err.message;
            return acc;
          },
          {} as Record<string, string>,
        );

        const validationError = new ValidationError(
          "Validation failed",
          errors,
        );

        next(validationError);
        return;
      } else {
        next(error);
      }
    }
  };
};

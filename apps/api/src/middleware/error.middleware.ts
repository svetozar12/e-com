import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const makeErrorsReadable = (errors) => {
  const readableErrors = {};
  errors.forEach((error) => {
    const path = error.path.join('.');
    readableErrors[path] = error.message;
  });
  return readableErrors;
};

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.json({
      status: 400,
      message: 'Validation error',
      errors: makeErrorsReadable(err.errors),
    });
  } else {
    console.log(err);
    return res.json({ status: 500, message: 'Internal server error' });
  }
}

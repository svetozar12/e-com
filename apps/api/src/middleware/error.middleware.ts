import { NextFunction, Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { ZodError } from 'zod';

const makeErrorsReadable = (errors) => {
  let readableErrors = '';
  errors.forEach((error) => {
    const path = error.path.join('.');
    readableErrors += path + ' ' + error.message + ', ';
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
    console.error(makeErrorsReadable(err.errors));
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: makeErrorsReadable(err.errors),
    });
  } else {
    console.error(makeErrorsReadable(err.message));
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
}

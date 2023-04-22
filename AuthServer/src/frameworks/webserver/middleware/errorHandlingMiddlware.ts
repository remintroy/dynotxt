import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

interface IErrorRequestHandler extends ErrorRequestHandler {
  statusCode?: number;
  customMessage?: string;
  message?: string;
}

export default function errorHandlingMiddlware(
  err: IErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  err.statusCode = err.statusCode || 404;
  return err.customMessage || err.message
    ? res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.customMessage || err.message,
      })
    : res.status(err.statusCode).json({ status: err.statusCode, message: err });
}

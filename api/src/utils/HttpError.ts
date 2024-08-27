import { Request, Response } from 'express';

type DefaultDetail = {
  description: string;
}

class HttpError extends Error {
  public message: string;

  public statusCode: number;

  public details: DefaultDetail[];

  constructor(
    message: string,
    statusCode?: number,
    details?: DefaultDetail[],
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode || 500;
    this.details = details || [];
  }

  render(req: Request, res: Response) {
    res
      .status(this.statusCode)
      .json({
        message: this.message,
        status: this.statusCode,
        details: this.details,
      });
  }
}

export type IHttpError = typeof HttpError;

export const createHttpError = (
  message: string,
  statusCode?: number,
  details?: DefaultDetail[],
): HttpError => new HttpError(message, statusCode, details);

export default HttpError;
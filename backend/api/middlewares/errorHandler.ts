import { Request, Response, NextFunction } from 'express';

import HttpError from '../utils/HttpError';

const errorHandler = (error: HttpError, req: Request, res: Response, _next: NextFunction) => {
  console.log(error);
  if (!error) return;

  if (!error.statusCode || error.statusCode >= 500) throw new Error('Unknown error');

  if (error.render) error.render(req, res);
  else {
    const errorCode = error.statusCode || 500;

    res.status(errorCode).json({
      message: 'Internal Server Error',
      status: errorCode,
      errors: [],
    });
  }
};

export default errorHandler;
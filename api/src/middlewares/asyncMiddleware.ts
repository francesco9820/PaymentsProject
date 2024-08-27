import {
    RequestHandler,
    Request,
    Response,
    NextFunction,
  } from 'express';
  
  type ParamsDictionary = { [key: string]: string; };
  
  const asyncMiddleware = <P extends ParamsDictionary>(fn: RequestHandler<P>): RequestHandler<P> => (
    req: Request<P>,
    res: Response,
    next: NextFunction,
  ) => Promise.resolve(fn(req, res, next)).catch(next);
  
  export default asyncMiddleware;
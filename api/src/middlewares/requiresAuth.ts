import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import User, { IUser } from '../models/User';

import { isString } from '../utils/validators';
import makeSecret from '../utils/makeSecret';
import { createHttpError } from '../utils/HttpError';

class ForbiddenError extends Error { }

type DecodedToken = {
    // eslint-disable-next-line camelcase
    user_id: string,
  }

const tokenLookup = {
    source: 'headers',
    param: 'authorization',
};

declare global {
    namespace Express {
      export interface Request {
        user: IUser;
      }
    }
  }

const requireAuth = async (req: Request, _: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  if (!isString(token)) throw createHttpError('Could not find any token in request', 401);
  token = token.replace('Bearer ', '');

  const secret = makeSecret(req);
  const decoded = jwt.verify(token, secret) as DecodedToken;

  if (!decoded) throw createHttpError('Not Authorized', 401);
  if (!decoded.user_id) throw createHttpError('Not Authorized', 401);
  
  const user = await User.findOne({ _id: decoded.user_id });
  if (!user) throw createHttpError('Not Authorized', 401);

  req.user = user;
  next();
}

export default requireAuth;
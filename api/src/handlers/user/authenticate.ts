import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { isString } from '../../utils/validators';
import { createHttpError } from '../../utils/HttpError';

import User from '../../models/User';
import makeSecret from '../../utils/makeSecret';

export type TokenPayload = {
    user_id: mongoose.Types.ObjectId,
    user_email: string,
  }

const authenticate = async (req: Request, res: Response) => {
    const {
        email
    } = req.body;

    if (!isString(email)) throw createHttpError(`Invalid email ${email}`, 400);

    const user = await User.findOne({
        email
    });
    if (!user) throw createHttpError('Not authorized', 401);

    const payload: TokenPayload = {
        user_id: user._id,
        user_email: user.email,
    };

    const secret = makeSecret(req);
    const expiresIn = 3600 * 12;
    const token = jwt.sign(
        payload,
        secret,
        { expiresIn },
    );

    res.json({ token });
};

export default authenticate;

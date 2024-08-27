import { Request, Response } from 'express';

import { isString } from '../../utils/validators';
import { createHttpError } from '../../utils/HttpError';

import User from '../../models/User';

const register = async (req: Request, res: Response) => {
    const {
        email
    } = req.body;

    if (!isString(email)) throw createHttpError(`Invalid email ${email}`, 400).render(req, res);

    const user = await new User({
        email
    }).save();

    res.json(user.toJson());
};

export default register;

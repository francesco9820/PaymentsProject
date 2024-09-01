import { Request, Response } from 'express';

import Subscription from '../../models/Subscription';

import { createHttpError } from '../../utils/HttpError';

const get = async (req: Request, res: Response) => {
    const { id: _id } = req.params;

    const subscription = await Subscription.findOne({
        _id,
    });
    if (!subscription) throw createHttpError(`Subscription with id ${_id} not found`, 404);

    res.json(await subscription.toJson());
};

export default get;

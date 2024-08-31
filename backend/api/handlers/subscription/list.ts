import { Request, Response } from 'express';

import Subscription from '../../models/Subscription';

const list = async (req: Request, res: Response) => {
    const { user } = req;

    const subscriptions = await Subscription.find({
        userId: user._id,
    });

    res.json(subscriptions.map((s) => s.toJson()));
};

export default list;

import { Request, Response } from 'express';

import Subscription from '../../models/Subscription';

const list = async (req: Request, res: Response) => {
    const { user } = req;

    const subscriptions = await Subscription.find({
        userId: user._id,
    });
    res.header('Content-Range', subscriptions.length.toString());
    res.header('Access-Control-Expose-Headers', 'Content-Range');

    res.json(subscriptions.map((s) => s.toJson()));
};

export default list;

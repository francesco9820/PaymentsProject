import { Request, Response } from 'express';

import Subscription from '../../models/Subscription';

const list = async (req: Request, res: Response) => {

    const subscriptions = await Subscription.find();

    res.json(subscriptions.map((s) => s.toJson()));
};

export default list;

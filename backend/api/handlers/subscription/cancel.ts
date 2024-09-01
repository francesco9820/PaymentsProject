import { Request, Response } from 'express';

import Subscription from '../../models/Subscription';

import { createHttpError } from '../../utils/HttpError';

import Braintree from '../../payments/Braintree';

const cancel = async (req: Request, res: Response) => {
    const { id: _id } = req.params;

    console.log('In hereeee');

    const subscription = await Subscription.findOne({
        _id,
    });
    if (!subscription) throw createHttpError(`Subscription with id ${_id} not found`, 400);

    const braintree = new Braintree();

    await braintree.cancelSubscription(
        subscription.braitreeSubscriptionId,
    );

    res.json(await subscription.toJson());
};

export default cancel;

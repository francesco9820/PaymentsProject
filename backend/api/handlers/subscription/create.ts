import { Request, Response } from 'express';

import { isBoolean, isNumber, isOneOfValues, isString } from '../../utils/validators';
import { createHttpError } from '../../utils/HttpError';

import Subscription from '../../models/Subscription';
import SubscriptionTypes from '../../costants/SubscriptionTypes';
import Braintree from '../../payments/Braintree';

const mapSubscriptionTypeToPrice: Record<SubscriptionTypes, number> = {
    [SubscriptionTypes.MONTHLY]: 7.99 * 12,
    [SubscriptionTypes.YEARLY]: 79.99
};

const create = async (req: Request, res: Response) => {
    const {
        name,
        subscriptionType,
        hasThermometer,
    } = req.body;

    const {
        user,
    } = req;

    if (!isString(name)) throw createHttpError(`Invalid name ${name}`, 400);
    if (!isOneOfValues(SubscriptionTypes)(subscriptionType)) throw createHttpError(`Invalid subscription type ${subscriptionType}`, 400);
    if (!isBoolean(hasThermometer)) throw createHttpError(`Invalid option hasThermometer ${hasThermometer}`, 400);

    const price = mapSubscriptionTypeToPrice[subscriptionType] + (hasThermometer ? 14.99 : 0);

    const brainTree = new Braintree();

    await brainTree.subscriptionProcess(
        user._id.toHexString(),
        price,
    );

    const subscription = await new Subscription({
        price,
        name,
        hasThermometer,
        subscriptionType,
        userId: user._id,
    }).save();

    res.json(subscription.toJson());
};

export default create;

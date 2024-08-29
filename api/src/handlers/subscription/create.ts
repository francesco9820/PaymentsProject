import { Request, Response } from 'express';

import { isBoolean, isNumber, isOneOfValues, isString } from '../../utils/validators';
import { createHttpError } from '../../utils/HttpError';

import Subscription from '../../models/Subscription';
import SubscriptionTypes from '../../costants/SubscriptionTypes';

const create = async (req: Request, res: Response) => {
    const {
        price,
        name,
        subscriptionType,
        hasThermometer,
    } = req.body;

    const {
        user,
    } = req;

    if (!isString(name)) throw createHttpError(`Invalid name ${name}`, 400);
    if (!isNumber(price)) throw createHttpError(`Invalid price ${price}`, 400);
    if (!isOneOfValues(SubscriptionTypes)(subscriptionType)) throw createHttpError(`Invalid subscription type ${subscriptionType}`, 400);
    if (!isBoolean(hasThermometer)) throw createHttpError(`Invalid option hasThermometer ${hasThermometer}`, 400);

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

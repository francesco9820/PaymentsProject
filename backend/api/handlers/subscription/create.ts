import { Request, Response } from 'express';

import { isBoolean, isNumber, isOneOfValues, isString } from '../../utils/validators';
import { createHttpError } from '../../utils/HttpError';

import Subscription from '../../models/Subscription';
import SubscriptionTypes from '../../costants/SubscriptionTypes';
import Braintree from '../../payments/Braintree';

const mapSubscriptionTypeToPrice: Record<SubscriptionTypes, number> = {
    [SubscriptionTypes.MONTHLY]: 9.90 * 12,
    [SubscriptionTypes.YEARLY]: 79.99,
};

const create = async (req: Request, res: Response) => {
    const {
        name,
        subscriptionType,
        hasThermometer,
        paymentMethodNonce,
    } = req.body;

    const {
        user,
    } = req;

    if (!isString(name)) throw createHttpError(`Invalid name ${name}`, 400);
    if (!isString(paymentMethodNonce)) throw createHttpError(`Invalid payment method ${paymentMethodNonce}`);
    if (!isOneOfValues(SubscriptionTypes)(subscriptionType)) throw createHttpError(`Invalid subscription type ${subscriptionType}`, 400);
    if (!isBoolean(hasThermometer)) throw createHttpError(`Invalid option hasThermometer ${hasThermometer}`, 400);

    const existingSubscriptions = await Subscription.countDocuments({
        name,
        userId: user._id,
    });
    if (existingSubscriptions > 0) throw createHttpError(`Subscription with name ${name} already exists`, 409);

    const price = mapSubscriptionTypeToPrice[subscriptionType] + (hasThermometer ? 14.90 : 0);

    const brainTree = new Braintree();

    const {
        braitreeSubscriptionId
    } = await brainTree.subscriptionProcess({
        customerId: user._id.toHexString(),
        hasThermometer,
        subscriptionType,
        subscriptionName: name,
        paymentMethodNonce,
    });

    const subscription = await new Subscription({
        price,
        name,
        hasThermometer,
        subscriptionType,
        userId: user._id,
        braitreeSubscriptionId,
    }).save();

    res.json(await subscription.toJson());
};

export default create;

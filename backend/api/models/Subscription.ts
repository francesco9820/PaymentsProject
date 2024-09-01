import mongoose from 'mongoose';
import dayjs from 'dayjs';

import SubscriptionTypes, { mapSubscriptionTypsToBillingFrequency } from '../costants/SubscriptionTypes';

import { isOneOfValues } from '../utils/validators';

import Braintree from '../payments/Braintree';

const { ObjectId } = mongoose.Schema.Types;

const SubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subscriptionType: {
    type: typeof SubscriptionTypes,
    required: true,
    validate: isOneOfValues(SubscriptionTypes),
  },
  hasThermometer: {
    type: Boolean,
    default: false,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  braitreeSubscriptionId: {
    type: String,
    required: true,
  }
});

SubscriptionSchema.index(
  { userId: 1, braitreeSubscriptionId: 1 },
);

async function toJson(this: ISubscription) {
  const brainTree = new Braintree();

  const braintreeSubscription = await brainTree.findSubscription(
    this.braitreeSubscriptionId,
  );

  if (!braintreeSubscription.numberOfBillingCycles) throw new Error(`Invalid number of billing cycles for subscription ${braintreeSubscription.id}`);

  return {
    id: this._id,
    name: this.name,
    hasThermometer: this.hasThermometer,
    price: this.price,
    subscriptionType: this.subscriptionType,
    userId: this.userId,
    braitreeSubscriptionId: this.braitreeSubscriptionId,
    status: braintreeSubscription.status,
    balance: braintreeSubscription.balance,
    nextBillingDate: braintreeSubscription.nextBillingDate,
    expirationDate: dayjs(braintreeSubscription.createdAt).add(
      braintreeSubscription.numberOfBillingCycles,
      mapSubscriptionTypsToBillingFrequency[this.subscriptionType],
    ).toDate(),
  };
}

SubscriptionSchema.methods.toJson = toJson;

SubscriptionSchema.statics.searchFields = () => [
  'name',
];

SubscriptionSchema.statics.objectIdSearchFields = () => [
  'userId',
];

export interface ISubscription extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  hasThermometer: boolean;
  price: number;
  subscriptionType: SubscriptionTypes;
  userId: mongoose.Types.ObjectId;
  braitreeSubscriptionId: string;
  toJson: typeof toJson;
}

export interface ISubscriptionModel extends mongoose.Model<ISubscription> {
  searchFields: () => string[];
  objectIdSearchFields: () => string[];
}

export default mongoose.model<ISubscription, ISubscriptionModel>('Subscription', SubscriptionSchema);
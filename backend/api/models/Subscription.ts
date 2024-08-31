import mongoose from 'mongoose';

import SubscriptionTypes from '../costants/SubscriptionTypes';

import { isOneOfValues } from '../utils/validators';

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
  }
});

SubscriptionSchema.index(
  { userId: 1 },
);

function toJson(this: ISubscription) {
  return {
    id: this._id,
    name: this.name,
    hasThermometer: this.hasThermometer,
    price: this.price,
    subscriptionType: this.subscriptionType,
    userId: this.userId,
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
  toJson: typeof toJson;
}

export interface ISubscriptionModel extends mongoose.Model<ISubscription> {
  searchFields: () => string[];
  objectIdSearchFields: () => string[];
}

export default mongoose.model<ISubscription, ISubscriptionModel>('Subscription', SubscriptionSchema);
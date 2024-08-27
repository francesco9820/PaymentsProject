import mongoose from 'mongoose';
import { isString } from '../utils/validators';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: isString
  },
});

UserSchema.index(
  { email: 1 },
);

function toJson(this: IUser) {
  return {
    id: this._id,
    email: this.email,
  };
}

UserSchema.methods.toJson = toJson;

UserSchema.statics.searchFields = () => [
  'email',
];

UserSchema.statics.objectIdSearchFields = () => [
  '_id',
];

export interface IUser extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  toJson: typeof toJson;
}

export interface IUserModel extends mongoose.Model<IUser> {
  searchFields: () => string[];
  objectIdSearchFields: () => string[];
}

export default mongoose.model<IUser, IUserModel>('User', UserSchema);
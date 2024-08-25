import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
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
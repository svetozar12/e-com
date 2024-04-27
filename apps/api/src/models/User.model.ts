import { Schema, model, Document } from 'mongoose';
import { IProduct } from './Product.model';

export interface IUser extends Document {
  email: string;
  createdAt: Date;
  updatedAt: Date;
  verificationCode: number;
  products: Array<IProduct['_id']>;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],

  verificationCode: {
    type: Number,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre<IUser>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const User = model<IUser>('User', userSchema);

export default User;

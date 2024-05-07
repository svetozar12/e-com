import { Schema, model, Document } from 'mongoose';
import { IProduct } from './Product.model';

export interface IUser extends Document {
  email: string;
  verificationCode: number;
  products: Array<IProduct['_id']>;
}

const userSchema = new Schema<IUser>(
  {
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
  },
  { timestamps: true }
);

const User = model<IUser>('User', userSchema);

export default User;

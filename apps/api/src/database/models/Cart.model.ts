import { model, Schema } from 'mongoose';
import { IProduct } from './Product.model';
import { IUser } from './User.model';

export interface ICart extends Document {
  products: Array<IProduct['_id']>;
  userId: IUser['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

cartSchema.pre<ICart>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Cart = model<ICart>('Cart', cartSchema);
export default Cart;

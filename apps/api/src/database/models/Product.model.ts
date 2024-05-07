import { Schema, model, Document } from 'mongoose';
import { ICategory } from './Category.model';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: ICategory['_id'];
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  },
  { timestamps: true }
);

const Product = model<IProduct>('Product', productSchema);

export default Product;

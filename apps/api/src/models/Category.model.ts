import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  parentCategory: Array<ICategory['_id']>;
  childCategory: Array<ICategory['_id']>;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parentCategory: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    childCategory: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  },
  { timestamps: true }
);

const Category = model<ICategory>('Category', categorySchema);

export default Category;

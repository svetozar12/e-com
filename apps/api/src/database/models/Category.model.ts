import { Schema, model, Document } from 'mongoose';

interface ISubcategory {
  name: string;
  // Optionally, you can include child subcategories here
  childSubcategories?: ISubcategory[];
}

// Define the category schema
export interface ICategory extends Document {
  name: string;
  parentCategory?: ICategory['_id']; // Optional parent category
  subcategories?: ISubcategory[];
}

const subcategorySchema = new Schema<ISubcategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    subcategories: [subcategorySchema], // Embed subcategory documents
  },
  { timestamps: true }
);

const Category = model<ICategory>('Category', categorySchema);

export default Category;

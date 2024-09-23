import { createProduct } from './Mutation/createProduct';
import { deleteProduct } from './Mutation/deleteProduct';
import { updateProduct } from './Mutation/updateProduct';
import { productById } from './Query/productById';
import { products } from './Query/products';

export const resolvers = {
  Query: { products, productById },
  Mutation: { createProduct, deleteProduct, updateProduct },
};

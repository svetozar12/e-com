import { createProduct } from './Mutation/createProduct';
import { deleteProduct } from './Mutation/deleteProduct';
import { signUp } from './Mutation/signUp';
import { updateProduct } from './Mutation/updateProduct';
import { verify } from './Mutation/verify';
import { productById } from './Query/productById';
import { products } from './Query/products';
import { verifyToken } from './Query/verifyToken';

export const resolvers = {
  Query: { products, productById, verifyToken },
  Mutation: { createProduct, deleteProduct, updateProduct, verify, signUp },
};

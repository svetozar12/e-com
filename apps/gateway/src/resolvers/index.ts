import { createProduct } from './Mutation/createProduct';
import { deleteProduct } from './Mutation/deleteProduct';
import { signUp } from './Mutation/signUp';
import { updateCart } from './Mutation/updateCart';
import { updateProduct } from './Mutation/updateProduct';
import { verify } from './Mutation/verify';
import { cart } from './Query/cart';
import { productById } from './Query/productById';
import { products } from './Query/products';
import { searchProduct } from './Query/searchProduct';
import { searchUser } from './Query/searchUser';
import { verifyToken } from './Query/verifyToken';

export const resolvers = {
  Query: { products, productById, verifyToken, cart },
  Mutation: {
    createProduct,
    deleteProduct,
    updateProduct,
    verify,
    signUp,
    updateCart,
    searchProduct,
    searchUser,
  },
};

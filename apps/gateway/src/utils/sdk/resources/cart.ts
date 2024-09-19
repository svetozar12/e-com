import { instance } from '../sdk';
import { Product } from './product';

type Cart = {
  products: Product[];
};

async function getCart(): Promise<Cart | undefined> {
  try {
    const { data } = await instance.get('/cart');
    return data?.cart;
  } catch (error) {
    return undefined;
  }
}

async function updateCart(reqData: {
  products?: Array<Product>;
  deleteProducts?: Array<string>;
}) {
  return instance.put('/cart', reqData);
}

export const cart = () => ({
  getCart: getCart,
  updateCart: updateCart,
});

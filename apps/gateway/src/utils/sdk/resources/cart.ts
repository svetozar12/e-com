import { Cart, CartProductInput } from '../../../codegen/types.generated';
import { instance } from '../sdk';

async function getCart(): Promise<Cart> {
  return (await instance.get('/cart')).data;
}

async function updateCart(reqData: {
  products?: Array<CartProductInput>;
  deleteProducts?: Array<string>;
}): Promise<Cart> {
  return (await instance.put('/cart', reqData)).data;
}

export const cart = () => ({
  getCart: getCart,
  updateCart: updateCart,
});

import { Cart, CartProductInput } from '../../../codegen/types.generated';
import { instance } from '../sdk';

async function getCart(token: string): Promise<Cart> {
  return (
    await instance.get('/cart', {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
}

async function updateCart(
  reqData: {
    products?: Array<CartProductInput>;
    deleteProducts?: Array<string>;
  },
  token: string
): Promise<Cart> {
  return (
    await instance.put('/cart', reqData, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
}

export const cart = () => ({
  getCart: getCart,
  updateCart: updateCart,
});

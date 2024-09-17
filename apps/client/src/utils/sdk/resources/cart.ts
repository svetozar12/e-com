import { instance } from '../sdk';
import { asyncHandler } from '../utils';

async function getCart() {
  return instance.get('/cart');
}

async function updateCart(reqData: { products: Array<string> }) {
  return instance.put('/cart', reqData);
}

export const cart = () => ({
  getCart: asyncHandler(getCart),
  updateCart: asyncHandler(updateCart),
});

import { instance } from '../sdk';
import { asyncHandler } from '../utils';

async function getCart() {
  return instance.get('/cart');
}

export const cart = () => ({
  get: asyncHandler(getCart),
});

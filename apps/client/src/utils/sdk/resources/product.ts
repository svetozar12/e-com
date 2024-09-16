import { instance } from '../sdk';
import { asyncHandler } from '../utils';

async function getProducts(
  query: { limit: number; page: number; sortBy?: string } = {
    limit: 10,
    page: 1,
  },
  category?: string
) {
  return instance.get('/products', { params: { ...query, category } });
}

async function getProductById(id: string, category: string) {
  return instance.get('/products', { params: { id, category } });
}

export const product = () => ({
  getProducts: asyncHandler(getProducts),
  getProductById: asyncHandler(getProductById),
});

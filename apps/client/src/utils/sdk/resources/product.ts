import { instance } from '../sdk';

export type Product = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
};

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
  return await instance.get('/products', { params: { id, category } });
}

export const product = () => ({
  getProducts: getProducts,
  getProductById: getProductById,
});

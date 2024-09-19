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
  const res = (
    await instance.get('/products', { params: { ...query, category } })
  ).data.data;
  console.log(res);
  return res;
}

async function getProductById(params: { id: string; category?: string }) {
  const { id } = params;
  return await instance.get(`/products/${id}`, { params });
}

export const product = () => ({
  getProducts: getProducts,
  getProductById: getProductById,
});

import { instance } from '../sdk';
import { asyncHandler } from '../utils';

export const product = () => ({
  getProductList: asyncHandler(getProductList),
  getProduct: asyncHandler(getProduct),
});

function getProductList(data = { page: 1, limit: 10, categoryId: '' }) {
  return instance.get(
    `/product?page=${data.page}&limit=${data.limit}&categoryId=${data.categoryId}`
  );
}

function getProduct(id: string) {
  return instance.get(`/product/${id}`);
}

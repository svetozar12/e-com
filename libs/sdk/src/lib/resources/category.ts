import { instance } from '../sdk';
import { asyncHandler } from '../utils';

function getCategory(id: string) {
  return instance.get(`/category/${id}`);
}

function getCategoryList() {
  return instance.get(`/category`);
}

export const category = () => ({
  getCategory: asyncHandler(getCategory),
  getCategoryList: asyncHandler(getCategoryList),
});

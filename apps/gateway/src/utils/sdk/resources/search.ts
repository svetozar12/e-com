import { Product, User } from '../../../codegen/types.generated';
import { instance } from '../sdk';

async function searchProducts(searchText: string): Promise<[Product]> {
  return (await instance.get('/search/product' + '?searchText=' + searchText))
    .data;
}

async function searchUsers(searchText: string): Promise<[User]> {
  return (await instance.get('/search/product' + '?searchText=' + searchText))
    .data;
}

export const search = () => ({
  searchProducts,
  searchUsers,
});

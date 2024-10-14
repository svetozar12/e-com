import { Product, User } from '../../../codegen/types.generated';
import { instance } from '../sdk';

async function searchProducts(
  searchText: string,
  token: string
): Promise<[Product]> {
  return (
    await instance.get('/search/product' + '?searchText=' + searchText, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
}

async function searchUsers(searchText: string, token: string): Promise<[User]> {
  return (
    await instance.get('/search/product' + '?searchText=' + searchText, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
}

export const search = () => ({
  searchProducts,
  searchUsers,
});

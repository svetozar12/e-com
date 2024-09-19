import { sdk } from '../../../utils/sdk';

async function getProducts() {
  return await sdk.product().getProducts();
}
export const productsResolver = {
  Query: {
    products: () => getProducts(), // Return the promise in the resolver
  },
};

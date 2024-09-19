import { productsResolver } from './products';

export const resolvers = {
  Query: {
    ...productsResolver.Query,
  },
};

console.log(resolvers);

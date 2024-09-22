import { productsResolver } from './products';

export const resolvers = {
  Query: {
    ...productsResolver.Query,
  },
  Mutation: {
    ...productsResolver.Mutation,
  },
};

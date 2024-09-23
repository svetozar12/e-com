import { createSchema } from 'graphql-yoga';
import { resolvers } from './resolvers';
import { productSchema } from './schema/product';

export const rootSchema = /* GraphQL */ `
  scalar Upload

  type Previous {
    limit: Int
    page: Int
  }

  type Next {
    limit: Int
    page: Int
  }

  input PaginationArgs {
    limit: Int
    page: Int
    sortBy: String
  }

  ${productSchema}

  type Query {
    products(pagination: PaginationArgs): ProductResponse
    productById(id: String!, category: String): Product
  }

  type MessageResponse {
    message: String
  }

  type Mutation {
    createProduct(file: Upload!, product: PostProductInput): Product
    updateProduct(id: String, product: PutProductInput): Product
    deleteProduct(id: String): MessageResponse
  }
`;

export const schema = createSchema({
  typeDefs: rootSchema,
  resolvers: resolvers,
});
console.log(rootSchema, schema);

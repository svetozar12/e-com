import { createSchema } from 'graphql-yoga';
import { resolvers } from './graphql/resolvers';

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
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

    input PostProductInput {
      name: String!
      description: String!
      price: Float!
      quantity: Int!
      userId: String!
      category: String!
    }

    input PutProductInput {
      name: String
      description: String
      price: Float
      quantity: Int
      userId: String
    }

    type Product {
      _id: ID!
      name: String!
      description: String
      price: Float!
      quantity: Int!
      category: String
      image: String
      createdAt: String
      updatedAt: String
    }

    type ProductResponse {
      next: Next
      previous: Previous
      data: [Product]
    }

    input ProductArgs {
      pagination: PaginationArgs
    }

    type Query {
      products(args: ProductArgs): ProductResponse
      productById(args: String): Product
    }

    type MessageResponse {
      message: String
    }

    type Mutation {
      createProduct(file: Upload!, product: PostProductInput): Product
      updateProduct(id: String, product: PutProductInput): Product
      deleteProduct(id: String): MessageResponse
    }
  `,
  resolvers: resolvers,
});

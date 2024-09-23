import { createSchema } from 'graphql-yoga';
import { resolvers } from './resolvers';
import { productSchema } from './schema/product';

export const rootSchema = /* GraphQL */ `
  # Product

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

  # Auth

  type VerifyResponse {
    accessToken: String!
  }

  # Cart

  # Search

  # User

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
    verifyToken(token: String!): MessageResponse
  }

  type MessageResponse {
    message: String
  }

  type Mutation {
    createProduct(file: Upload!, product: PostProductInput): Product
    updateProduct(id: String, product: PutProductInput): Product
    deleteProduct(id: String): MessageResponse
    signUp(email: String!): MessageResponse
    verify(email: String!, code: String!): VerifyResponse
  }
`;

export const schema = createSchema({
  typeDefs: rootSchema,
  resolvers: resolvers,
});

import { createSchema } from 'graphql-yoga';
import { resolvers } from './resolvers';
export const rootSchema = /* GraphQL */ `
  scalar DateTime
  scalar Upload

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

  type Cart {
    products: [String]!
    userId: String!
    createdAt: DateTime!
    updateAt: DateTime
  }

  input CartProductInput {
    name: String!
    description: String!
    price: Float!
    quantity: Int!
    image: String!
    _id: String!
  }

  # Search

  # User

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

  type MessageResponse {
    message: String
  }

  type Query {
    products(pagination: PaginationArgs): ProductResponse
    productById(id: String!, category: String): Product
    verifyToken(token: String!): MessageResponse
    cart: Cart
  }

  type Mutation {
    createProduct(file: Upload!, product: PostProductInput): Product
    updateProduct(id: String, product: PutProductInput): Product
    deleteProduct(id: String): MessageResponse
    signUp(email: String!): MessageResponse
    verify(email: String!, code: String!): VerifyResponse
    cartUpdate(products: [CartProductInput!], deleteProducts: [String!]!): Cart
  }
`;

export const schema = createSchema({
  typeDefs: rootSchema,
  resolvers: { ...resolvers },
});

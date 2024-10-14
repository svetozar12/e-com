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
    description: String!
    price: Float!
    quantity: Int!
    category: String!
    image: String!
    createdAt: String!
    updatedAt: String!
  }

  type ProductResponse {
    next: Next!
    previous: Previous!
    data: [Product!]!
  }

  # Auth

  type VerifyResponse {
    accessToken: String!
  }

  # Cart

  type Cart {
    products: [CardProduct]!
    userId: String!
    createdAt: DateTime!
    updateAt: DateTime!
  }

  type CardProduct {
    name: String!
    description: String!
    price: Float!
    quantity: Int!
    image: String!
    _id: String!
  }

  input CartProductInput {
    name: String!
    description: String!
    price: Float!
    quantity: Int!
    image: String!
    _id: String!
  }

  # User

  type User {
    email: String!
  }

  # Common

  type Previous {
    limit: Int!
    page: Int!
  }

  type Next {
    limit: Int!
    page: Int!
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
    # product
    products(pagination: PaginationArgs): ProductResponse!
    productById(id: String!, category: String): Product!
    # auth
    verifyToken: MessageResponse!
    # cart
    cart: Cart!
    # search
    searchProduct(searchText: String): [Product!]!
    searchUser(searchText: String): [User!]!
  }

  type Mutation {
    # proudct
    createProduct(file: Upload!, product: PostProductInput): Product!
    updateProduct(id: String, product: PutProductInput): Product!
    deleteProduct(id: String): MessageResponse!
    # auth
    signUp(email: String!): MessageResponse!
    verify(email: String!, code: String!): VerifyResponse!
    # cart
    updateCart(products: [CartProductInput!], deleteProducts: [String!]): Cart!
  }
`;

export const schema = createSchema({
  typeDefs: rootSchema,
  resolvers: { ...resolvers },
});

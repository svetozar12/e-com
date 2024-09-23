export const productSchema = /* GraphQL */ `
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
`;

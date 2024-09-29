import { gql } from '@apollo/client';

export const updateCartMutation = gql`
  mutation updateCart(
    $deleteProducts: [String!] = ""
    $products: [CartProductInput!] = {
      name: ""
      description: ""
      price: 1.5
      quantity: 10
      image: ""
      _id: ""
    }
  ) {
    updateCart(deleteProducts: $deleteProducts, products: $products) {
      createdAt
      products {
        name
        description
        price
        quantity
        image
        _id
      }
      updateAt
      userId
    }
  }
`;

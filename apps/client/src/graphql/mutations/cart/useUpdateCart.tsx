import { gql, useMutation } from '@apollo/client';
import { Cart, MutationUpdateCartArgs } from '../../generated';

export const updateCartMutation = gql`
  mutation MyMutation(
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
      products
      updateAt
      userId
    }
  }
`;

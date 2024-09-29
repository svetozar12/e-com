import { gql } from '@apollo/client';

export const cartQuery = gql`
  query cart {
    cart {
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

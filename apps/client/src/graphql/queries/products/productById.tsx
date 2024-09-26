import { gql, useQuery } from '@apollo/client';
import { Product, QueryProductByIdArgs } from '../../generated';

export const productByIdQuery = gql`
  query MyQuery($id: String = "", $category: String = "") {
    productById(id: $id, category: $category) {
      _id
      category
      createdAt
      description
      image
      name
      price
      quantity
      updatedAt
    }
  }
`;

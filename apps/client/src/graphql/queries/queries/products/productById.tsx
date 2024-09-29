import { gql } from '@apollo/client';

export const productByIdQuery = gql`
  query productById($id: String = "", $category: String = "") {
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

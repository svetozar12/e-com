import { gql } from '@apollo/client';

export const deleteProductMutation = gql`
  mutation deleteProduct($id: String = "") {
    deleteProduct(id: $id) {
      message
    }
  }
`;

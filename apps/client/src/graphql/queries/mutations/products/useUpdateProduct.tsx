import gql from 'graphql-tag';

export const updateProductMutation = gql`
  mutation updateProduct($id: String = "", $product: PutProductInput = {}) {
    updateProduct(id: $id, product: $product) {
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

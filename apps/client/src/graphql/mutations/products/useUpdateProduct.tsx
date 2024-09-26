import gql from 'graphql-tag';
import { MutationUpdateProductArgs, Product } from '../../generated';
import { useMutation } from '@apollo/client';

const mutation = gql`
  mutation MyMutation($id: String = "", $product: PutProductInput = {}) {
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

export const useUpdateProduct = (props: MutationUpdateProductArgs) => {
  return useMutation<Product>(mutation, { variables: props });
};

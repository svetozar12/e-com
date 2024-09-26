import { gql, useMutation } from '@apollo/client';
import { MessageResponse, MutationDeleteProductArgs } from '../../generated';

const mutation = gql`
  mutation MyMutation($id: String = "") {
    deleteProduct(id: $id) {
      message
    }
  }
`;

export const useDeleteProduct = (props: MutationDeleteProductArgs) => {
  return useMutation<MessageResponse>(mutation, { variables: props });
};

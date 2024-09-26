import { gql, useMutation } from '@apollo/client';
import { MutationVerifyArgs, VerifyResponse } from '../../generated';

const mutation = gql`
  mutation MyMutation($code: String = "", $email: String = "") {
    verify(code: $code, email: $email) {
      accessToken
    }
  }
`;

export const useVerify = (props: MutationVerifyArgs) => {
  return useMutation<VerifyResponse>(mutation, { variables: props });
};

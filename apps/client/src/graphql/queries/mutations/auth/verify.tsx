import { gql } from '@apollo/client';

export const verifyMutation = gql`
  mutation verify($code: String = "", $email: String = "") {
    verify(code: $code, email: $email) {
      accessToken
    }
  }
`;

import { gql } from '@apollo/client';

export const verifyTokenQuery = gql`
  query MyQuery($token: String = "") {
    verifyToken(token: $token) {
      message
    }
  }
`;

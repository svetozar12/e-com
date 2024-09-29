import { gql } from '@apollo/client';

export const verifyTokenQuery = gql`
  query verifyToken($token: String = "") {
    verifyToken(token: $token) {
      message
    }
  }
`;

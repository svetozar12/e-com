import { gql } from '@apollo/client';

export const signUpMutation = gql`
  mutation MyMutation($email: String = "") {
    signUp(email: $email) {
      message
    }
  }
`;

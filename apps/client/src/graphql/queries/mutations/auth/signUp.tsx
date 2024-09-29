import { gql } from '@apollo/client';

export const signUpMutation = gql`
  mutation signUp($email: String = "") {
    signUp(email: $email) {
      message
    }
  }
`;

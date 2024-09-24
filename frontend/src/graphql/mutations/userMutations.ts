import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      firstName
      lastName
      username
      email
    }
  }
`;

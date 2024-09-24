import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
      id
      firstName
      lastName
      username
      email
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginUser: { email: $email, password: $password }) {
      id
      firstName
      lastName
      username
      email
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      id
      firstName
      lastName
      username
      email
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
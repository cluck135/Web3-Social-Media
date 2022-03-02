import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      tagline
      avatar
      posts {
        description
        comments {
          text
        }
      }
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      tagline
      avatar
      posts {
        description
        comments {
          text
        }
      }
    }
  }
`;

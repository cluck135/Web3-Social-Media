import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      tagline
      avatar
      posts {
        nft {
          image
        }
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
        nft {
          comment
          image
        }
        comments {
          text
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query allPosts {
    posts {
      _id
      description
      nft {
        description
        image
      }
    }
  }
`;

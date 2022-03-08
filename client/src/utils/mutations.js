import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      username
      posts {
        _id
        description
        nft {
          image
        }
      }
      tagline
      avatar
    }
  }
}
`;

export const UPDATE_USER = gql`
  mutation updateUser( $username: String! $newTagline: String! $newAvatar: String!) {
    updateUser( username: $username newTagline: $newTagline newAvatar: $newAvatar) {
      user {
        username
        tagline
        avatar
      }
    }
  }
`;
export const ADD_POST = gql`
  mutation addPost($description: String!, $username: String!, $nft: newNFT!) {
    addPost(description: $description, username: $username, nft: $nft) {
      _id
      description
      nft {
        name
        image
        description
      }
    }
  }
`;
export const REMOVE_POST = gql`
  mutation removePost($username: String!, $postId: ID!) {
    removePost(username: $username, postId: $postId) {
      _id
    }
  }
`;

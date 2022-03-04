const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    tagline: String
    avatar: String
    openSeaLink: String
    nfts: NFT
    posts: [Post]
    password: String!
  }

  type Post {
    _id: ID!
    description: String!
    nfts: NFT
    comments: [Comment]
    createdAt: String
  }

  type Comment {
    _id: ID!
    text: String!
    author: User
    createdAt: String
  }

  type NFT {
    _id: ID!
    name: String!
    description: String!
    image: String!
  }

  input newNFT {
    name: String!
    description: String!
    image: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    updateUser(username: String!, newTagline: String!, newAvatar: String): Auth
    addPost(username: String!, description: String!, nfts: newNFT!): Post
    addComment(postId: ID!, text: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;

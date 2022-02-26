const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    tagline: String!
    avatar: String!
    openSeaLink: String
    nfts: NFT
  }

  type Post {
    _id: ID!
    desciption: String
    nft: NFT
    comment: [Comment!]
  }

  type Comment {
    _id: ID!
    content: String!
    Author: User
  }

  type NFT {
    name: String!
    description: String!
    image: String!
  }

  type Query {
    me(username: String!): User
  }
`;

module.exports = typeDefs;

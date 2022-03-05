const { AuthenticationError } = require("apollo-server-express");
const { User, NFT, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate({
        path: "posts",
        populate: {
          path: "nft",
          model: "NFT",
        },
      });
    },
    user: async (_, { username }) => {
      return User.findOne({ username }).populate("posts").populate("nfts");
    },
    posts: async (_, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 }).populate("nft");
    },
    post: async (_, { postId }) => {
      return Post.findOne({ _id: postId }).populate("nft");
    },
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("posts");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (_, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError(
          "No user found with this username address"
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addPost: async (_, { username, nft, description }) => {
      const newNft = await NFT.create({
        name: nft.name,
        description: nft.description,
        image: nft.image,
      });
      const post = await Post.create({
        description,
        nft: newNft._id,
      });
      await User.findOneAndUpdate(
        { username: username },
        { $addToSet: { posts: post._id } },
        {
          new: true,
        }
      );

      const returnPost = {
        ...post._doc,
        nft: {
          ...newNft._doc,
        },
      };

      return returnPost;
      // throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (_, { postId, text }, context) => {
      if (context.user) {
        return await Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { text: text, author: context.user },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // throw new AuthenticationError('You need to be logged in!');
    },
    removePost: async (_, { postId, username }) => {
      const post = await Post.findOneAndDelete({
        _id: postId,
      });

      await User.findOneAndUpdate(
        { username: username },
        { $pull: { posts: post._id } }
      );

      return post;
    },
    removeComment: async (_, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateUser: async (_, { username, newTagline, newAvatar }, context) => {
      return User.findOneAndUpdate(
        { username: username },
        {
          tagline: newTagline,
          avatar: newAvatar,
        }
      );
    },
  },
};

module.exports = resolvers;

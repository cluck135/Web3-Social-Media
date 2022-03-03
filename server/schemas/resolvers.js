const { AuthenticationError } = require("apollo-server-express");
const { User, NFT, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("posts");
    },
    user: async (_, { username }) => {
      return User.findOne({ username }).populate("posts");
    },
    posts: async (_, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (_, { postId }) => {
      return Post.findOne({ _id: postId });
    },
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("post");
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
    addPost: async (_, { description }, context) => {
      context.user = "Casen";
      if (context.user) {
        const post = await Post.create({
          description,
          //nft: context.user.username,
        });

        await User.findOneAndUpdate(
          { username: "Casen" },
          { $addToSet: { posts: post._id } },
          {
            new: true,
          }
        );

        return post;
      }
      // throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (_, { postId, text }, context) => {
      context.user = "Casen";
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
    removePost: async (_, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
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

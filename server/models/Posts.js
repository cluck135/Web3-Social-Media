const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
  postDescription: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
    nfts: {
        type: Schema.Types.ObjectId,
        ref: 'NFT',
    },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Posts = model('Posts', postSchema);

module.exports = Posts;

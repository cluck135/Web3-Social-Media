const mongoose = require("mongoose");
const { Schema, model } = mongoose.schema;
const bcrypt = require('bcryptjs');

const profileSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    tagline: {
        type: String,
        required: false,
    },
    avatar: {
        type: String,
        required: false,
    },
    openSeaAcctLink: {
        type: String,
        required: false,
    },
    nfts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'NFT',
        },
    ],
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  const User = model('Users', userSchema);
  
  module.exports = Users;


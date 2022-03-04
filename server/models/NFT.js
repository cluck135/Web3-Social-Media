const { Schema, model } = require('mongoose');

const nftSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    image:{
        type: String,
        required: true,
    },
});

const NFT = model('NFT', nftSchema);

module.exports = NFT;
const { Schema, model } = require('mongoose');

const nftSchema = new Schema({
    nftName: {
        type: String,
        required: true,
        trim: true,
    },
    nftDescription: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    nftImage:{
        type: String,
        required: true,
    },
});

const NFT = model('NFT', nftSchema);

module.exports = NFT;
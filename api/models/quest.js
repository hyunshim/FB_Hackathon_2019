const mongo = require('mongoose');

const questSchema = mongo.Schema({
    _id: mongo.Schema.Types.ObjectId,
    name: String,
    author: Number,
    location: String,
    date: { type: Date, default: Date.now },
    reward: String,
    comments: [
        { posted: { type: Date, default: Date.now },
          author: Number,
          text: String }
       ], default : null,
    description: String,
    imgurl: String
});

module.exports = mongo.model('Quest', questSchema);
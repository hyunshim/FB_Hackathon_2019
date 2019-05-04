const mongo = require('mongoose');

const questSchema = mongo.Schema({
    _id: mongo.Schema.Types.ObjectId,
    name: String,
    author: Number,
    coordinates: { type: [Number], index: '2dsphere'},
    date: { type: Date, default: Date.now },
    reward: String,
    comments: [
        { posted: { type: Date, default: Date.now },
          author: Number,
          text: String, required: false }
       ],
    description: String,
    imgurl: String,
    icon: String
});

module.exports = mongo.model('Quest', questSchema);
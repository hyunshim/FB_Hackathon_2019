const mongo = require('mongoose');

const questSchema = mongo.Schema({
    _id: mongo.Schema.Types.ObjectId,
    name: {type:String, required: true},
    author: String,
    location: [Number, Number],
    date: { type: Date, default: Date.now },
    reward: String,
    comments: [
        { posted: { type: Date, default: Date.now },
          author: String,
          text: String, required: false }
       ],
    description: String,
    imgurl: String,
    icon: String,
    status: { type: Boolean, default: false }
});

module.exports = mongo.model('Quest', questSchema);
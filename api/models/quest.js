const mongo = require('mongoose');

const questSchema = mongo.Schema({
    _id: mongo.Schema.Types.ObjectId,
    name: String,
    author: String,
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
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
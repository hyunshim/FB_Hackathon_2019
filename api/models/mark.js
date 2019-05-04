const mongo = require('mongoose');

const markSchema = mongo.Schema({
    _id: mongo.Schema.Types.ObjectId,
    title: String,
    score: Number,
    average: Number
});

module.exports = mongo.model('Mark', markSchema);
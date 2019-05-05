const mongo = require('mongoose');

const userSchema = mongo.Schema({
    _id: mongo.Schema.Types.ObjectId,
    name: String,
    ph: String,
    address: String,
    experience: Number,
    quests: Array,
    title: { type: String, default: null }
});

module.exports = mongo.model('User', userSchema);
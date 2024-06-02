const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    _id: String,
    roomID: String,
    sender: String,
    text: String,
    timestamp: { type: Date, default: Date.now }
});

const roomSchema = new mongoose.Schema({
    _id: String,
    name: String,
    //array of object ids of the messages
    messages: [messageSchema]
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: String,
    text: String,
    timestamp: { type: Date, default: Date.now }
});

const roomSchema = new mongoose.Schema({
    name: String,
    messages: [messageSchema]
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
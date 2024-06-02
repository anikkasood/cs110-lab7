// Controller handler to handle functionality in room page
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Room = require('../models/room');

const roomGenerator = require('../util/roomIdGenerator.js');


// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response){
    response.render('room', 
    { title: 'chatroom', 
      roomName: request.params.roomName, 
      newRoomId: roomGenerator.roomIdGenerator()
    });
}


router.get('/rooms/:_id', async (req, res) => {
    try {
      const roomId = req.params._id;
      console.log(roomId); // display the room id
      const roomMSG = await Room.findById(roomId).populate('messages');
      if (!roomMSG) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.json(roomMSG);
      console.log(roomMSG); // display the messages in the room
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = {
    getRoom,
    router
};

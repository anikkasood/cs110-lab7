// Controller handler to handle functionality in room page
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Room = require('../models/room');

const roomGenerator = require('../util/roomIdGenerator.js');


// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response){
    response.render('room', 
        {title: 'chatroom', 
         roomName: request.params.name, 
         newRoomId: roomGenerator.roomIdGenerator()
        });
}

//getting room id
router.get('/rooms/:_id', async (req, res) => {
    try {
      const roomId = req.params._id;
      console.log('Requested Room Id: ', roomId);

      const roomMSG = await Room.findById(roomId).populate('messages');
      if (!roomMSG) {
        return res.status(404).json({ message: 'Room not found' });
      }

      res.json(roomMSG);
      //accessing the array of messages
      const messages = roomMSG.messages;
      //res.json(messages);
      console.log(messages);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});



//get all rooms
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find({}, 'name');
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = {
    getRoom,
    router
};

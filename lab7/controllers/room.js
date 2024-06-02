// Controller handler to handle functionality in room page
const express = require('express');
const mongoose = require('mongoose');
const Room = require('../models/room');

const roomGenerator = require('../util/roomIdGenerator.js');

const routerRoom = express();


// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response){
    response.render('room', {title: 'chatroom', roomName: request.params.roomName, newRoomId: roomGenerator.roomIdGenerator()});
}


routerRoom.get('/rooms/:_id', async (req, res) => {
    try {
      const roomId = req.params._id;
      console.log(roomId);
      const room = await Room.findById(roomId).populate('messages');
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.json(room);
      console.log(room);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = {
    getRoom,
    routerRoom
};

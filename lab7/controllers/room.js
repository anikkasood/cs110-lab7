// Controller handler to handle functionality in room page

const roomGenerator = require('../util/roomIdGenerator.js');

// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response){
    response.render('room', {title: 'chatroom', roomName: request.params.roomName, newRoomId: roomGenerator.roomIdGenerator()});
}

//as
function createRoom(request, response) {
    console.log(request.body.roomName);
    response.send("your mom");
}

module.exports = {
    getRoom,
    createRoom //as
};
// Controller handler to handle functionality in home page

const express = require('express');
const router = express.Router();

const Room = require('../models/room');

// Example for handle a get request at '/' endpoint.

// function getHome(request, response){
//   // do any work you need to do, then
//   response.render('home', {title: 'home'});
// }


// Route handler to render home.hbs template
// router.get('/', (req, res) => {
//   // data to pass to the home.hbs
//   const data = {
//       title: 'Home Page',
//       greeting: 'Welcome to our website!'
//   };

//   // Render the home.hbs template with the data
//   res.render('home', data);
// });


router.get('/home', async (req, res) => {
  try {
      const rooms = await Room.find({}, 'name');
      const roomNames = rooms.map(room => room.name);
      console.log('Room Names:', roomNames);
      // Render the home template with room names as the title
      res.render('home', { title: 'Home Page', roomNames });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});




module.exports = {
    //getHome
    router
};
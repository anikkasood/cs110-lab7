// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const config = require("config");


// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs.engine({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//get from default.json
const db = config.get('mongoURI'); 

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
// set up stylesheets route

// TODO: Add server side code



//connecting to local host mongodb - KM
//const uri = "mongodb+srv://kelseymoose346:laMaENwsdzG46M2D@lab7.ziuefqs.mongodb.net/?retryWrites=true&w=majority&appName=lab7";
// mongoose.connect("mongodb+srv://kelseymoose346:laMaENwsdzG46M2D@lab7.ziuefqs.mongodb.net/?retryWrites=true&w=majority&appName=lab7");


// Create controller handlers to handle requests at each endpoint
app.get('/', homeHandler.getHome);
app.get('/:roomName', roomHandler.getRoom);

// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
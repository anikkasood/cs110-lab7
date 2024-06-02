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

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri,  {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// }
// );

//connecting to local host mongodb - KM
//const uri = "mongodb+srv://kelseymoose346:laMaENwsdzG46M2D@lab7.ziuefqs.mongodb.net/?retryWrites=true&w=majority&appName=lab7";
// mongoose.connect("mongodb+srv://kelseymoose346:laMaENwsdzG46M2D@lab7.ziuefqs.mongodb.net/?retryWrites=true&w=majority&appName=lab7");

async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
  
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}
run().catch(console.dir);




// Create controller handlers to handle requests at each endpoint
app.get('/', homeHandler.getHome);
//app.get('/:roomName', roomHandler.getRoom);

app.use('/', roomHandler.router);
//app.post('/create', roomHandler.createRoom); //as
//app.get("/:roomName", roomHandler.getRoom); KM - need to add
//app.get('/:roomName/messages', roomHandler.getRoom);    KM - need to add

// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
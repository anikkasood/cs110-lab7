const express = require('express');
const connectDB = require('./controllers/db');

const app = express();

// Middleware setup
app.use(express.json());

// Route example
app.get('/', async (req, res) => {
    const db = await connectDB();
    const collection = db.collection('my_collection');
    const document = await collection.findOne({ name: "MongoDB Atlas" });
    res.send(document);
});

module.exports = app;

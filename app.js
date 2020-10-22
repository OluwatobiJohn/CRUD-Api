const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');


//MiddleWares
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Import Routes
const notesRoute = require('./routes/notes');
app.use('/notes', notesRoute)
// Home Route 
app.get('/', (req, res) => {
    res.send('This is the Homepage');
});


// Connect to DB
mongoose.connect( process.env.DB_CONNECTION, 
    { useNewUrlParser: true,useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB');
});

// Listen to a Server 
app.listen(3000, () => {
    console.log('App is listening on Port 3000');
});
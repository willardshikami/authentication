const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require('./config/database');

//connecting to DB
mongoose.connect(config.database);

//
mongoose.connection.on('connected', () =>{
    console.log('Connected to databse ' + config.database);
});

//initializing the app variable using express
const app = express();

//setting 3000 to the port variable
const port = 3000;

//users file
const users = require('./routes/users');

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());

//route to users
app.use('/users', users);

//the homepage route printing some text to the screen
app.get('/', (req, res) =>{
    res.send('Invalid endpoint');
});

//listening to the port (300) and starting up the server
app.listen(port, () => {
    console.log("Server started on port " + port)
});
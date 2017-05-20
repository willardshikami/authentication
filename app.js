const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connecting to DB
mongoose.connect(config.database);

//checking if DB is connected
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

//checking for errors in the DB
mongoose.connection.on('error', (err) => {
    console.log('Database error' + err);
});

//initializing the app variable using express
const app = express();

//users file
const users = require('./routes/users');


//setting 3000 to the port variable
const port = 3000;

//CORS Middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//route to users
app.use('/users', users);

//the homepage route printing some text to the screen
app.get('/', (req, res) =>{
    res.send('Invalid endpoint');
});

//listening to the port (300) and starting up the server
app.listen(port, () => {
    console.log("Server started on port " + port);
});
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  password: {
    type:  String,
    required: true
  }
});

//exporting the User variable
const User = module.exports = mongoose.model('User', UserSchema);

//exporting the getUserById function
module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

//exporting the getUserByUsername function
module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

//changing the password to hash
module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}
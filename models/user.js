const mongoose = require('mongoose');

//This is for the user
const userSchema = new mongoose.Schema({


  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('UserProject', userSchema);

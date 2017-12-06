const mongoose = require('mongoose');

const journeySchema = require('./journey');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  journeys: [journeySchema]
});

module.exports = mongoose.model('User', userSchema);

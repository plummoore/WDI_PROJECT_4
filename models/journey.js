const mongoose = require('mongoose');
const videoSchema = require('./video');

const journeySchema = new mongoose.Schema({
  name: {type: String},
  route: {
    mode: String,
    start: String,
    end: String,
    distanceMiles: String,
    distanceMetres: Number,
    durationMins: String,
    durationSecs: Number
  },
  regular: Boolean,
  savedVideos: [videoSchema]

});

module.exports = journeySchema;

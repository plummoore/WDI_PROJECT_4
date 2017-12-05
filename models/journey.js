const mongoose = require('mongoose');
const videoSchema = require('./video').videoSchema;

const journeySchema = new mongoose.Schema({
  name: {type: String},
  // route: {
  //   mode: String,
  //   start: String,
  //   end: String,
  //   distanceMiles: String,
  //   distanceMetres: 123,
  //   durationMins: String,
  //   durationSecs: 123
  // },
  regular: Boolean
  // savedVideos: [videoSchema],

});

module.exports = mongoose.model('Journey', journeySchema);

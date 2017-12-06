const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  name: String,
  archived: Boolean,
  videoId: String
});

module.exports = videoSchema;

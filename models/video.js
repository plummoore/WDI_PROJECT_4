const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  // name: String,
  archived: Boolean,
  videoId: String,
  duration: String,
  journey: { type: mongoose.Schema.ObjectId, ref: 'Journey' },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Video', videoSchema);

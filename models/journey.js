const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
  name: {type: String},
  start: {
    lat: Number,
    lng: Number
  },
  end: {
    lat: Number,
    lng: Number
  },
  mode: {type: String},
  distance: Number,
  duration: Number,
  regular: Boolean,
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

journeySchema.virtual('savedVideos', {
  ref: 'Video',
  localField: '_id',
  foreignField: 'journey'
});

module.exports = mongoose.model('Journey', journeySchema);

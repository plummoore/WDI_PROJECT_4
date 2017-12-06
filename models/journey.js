const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
  name: { type: String },
  route: {
    mode: String,
    start: String,
    end: String,
    distanceMiles: String,
    distanceMetres: Number,
    durationMins: String,
    durationSecs: Number
  },
  regular: Boolean
});

journeySchema.virtual('savedVideos', {
  ref: 'Video',
  localField: '_id',
  foreignField: 'journey'
});

module.exports = journeySchema;

const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
  name: {type: String},
  startLocation: {
    lat: Number,
    lng: Number
  },
  endLocation: {
    lat: Number,
    lng: Number
  },
  mode: {type: String},
  distance: Number,
  duration: Number,
  regular: Boolean,
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

//   name: { type: String },
//   route: {
//     mode: String,
//     start: String,
//     end: String,
//     startCO: {
//       startlat: Number,
//       startlng: Number
//     },
//     distanceMiles: String,
//     distanceMetres: Number,
//     durationMins: String,
//     durationSecs: Number
//   },
//   regular: Boolean,
//   createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
// });

journeySchema.virtual('savedVideos', {
  ref: 'Video',
  localField: '_id',
  foreignField: 'journey'
});

module.exports = mongoose.model('Journey', journeySchema);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  image: {type: String},
  password: {type: String, required: true}
  // journeys: [ {type: mongoose.Schema.ObjectId, ref: 'Journey'} ]
});

userSchema.virtual('videos', {
  ref: 'Video',
  localField: '_id',
  foreignField: 'createdBy'
});

userSchema.virtual('savedVideos')
  .get(function() {
    console.log(this.videos);
    if (this.videos) return _.uniqBy(this.videos.filter(video => !video.archived), 'videoId');
    return;
  });

userSchema.virtual('archivedVideos')
  .get(function() {
    if (this.videos) return _.uniqBy(this.videos.filter(video => video.archived), 'videoId');
    return;
  });

userSchema.virtual('journeys', {
  ref: 'Journey',
  localField: '_id',
  foreignField: 'createdBy'
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(!this._passwordConfirmation || this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

const User = require('../models/user');

// function videosIndex(req, res, next) {
//   User
//     .findById(req.params.id)
//     .exec()
//     .then(user => {
//       if (!user) return res.status(404).json({ message: 'User not found.'});
//       const journeys = user.journeys;
//       console.log(journeys);
//     });
// }

function videosCreate(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if(!user) return res.status(404).json({ message: 'User not found.'});
      const journey = user.journeys.id(req.params.journeyId);
      journey.savedVideos.push(req.body);
      return user.save();
    })
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(next);
}

function videosUpdate(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found.'});
      const journey = user.journeys.id(req.params.journeyId);
      // // console.log(journey);
      const video = journey.savedVideos.id(req.params.videoId);
      // console.log(video);
      for (const field in req.body) {
        video[field] = req.body[field];
      }
      return user.save();
    })
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(next);
}

function videosDelete(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found.'});
      const journey = user.journeys.id(req.params.journeyId);
      const video = journey.savedVideos.id(req.params.videoId);
      video.remove();
      return user.save();
    })
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(next);
}

module.exports = {
  update: videosUpdate,
  delete: videosDelete,
  create: videosCreate
};

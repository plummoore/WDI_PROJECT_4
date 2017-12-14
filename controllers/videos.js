const Video = require('../models/video');

function videosIndex(req, res, next) {
  Video
    .find()
    .exec()
    .then(videos => res.status(200).json(videos))
    .catch(next);
}

function videosCreate(req, res, next) {
  req.body.createdBy = req.currentUser.id;
  req.body.journey = req.params.journeyId;

  Video
    .create(req.body)
    .then(video => res.status(200).json(video))
    .catch(next);
}

function videosUpdate(req, res, next) {
  Video
    .findById(req.params.videoId)
    .exec()
    .then(video => {
      if (!video) return res.status(404).json({ message: 'Video not found.'});
      for (const field in req.body) {
        video[field] = req.body[field];
      }
      return video.save();
    })
    .then(video => {
      return res.status(200).json(video);
    })
    .catch(next);
}

function videosDelete(req, res, next) {
  Video
    .findById(req.params.videoId)
    .exec()
    .then(video => {
      if (!video) return res.status(404).json({ message: 'Video not found.'});
      video.remove();
    })
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(next);
}


module.exports = {
  index: videosIndex,
  create: videosCreate,
  update: videosUpdate,
  delete: videosDelete
};

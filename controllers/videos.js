const Video = require('../models/video');



function videosCreate(req, res, next) {
  req.body.createdBy = req.params.id;
  req.body.journey = req.params.journeyId;

  Video
    .create(req.body)
    .then(video => res.status(200).json(video))
    .catch(next);
}

function videosIndex(req, res, next) {
  Video
    .find({createdBy: req.params.id})
    .exec()
    .then(videos => {
      console.log(videos);



      const savedVideos = videos.filter(video => !video.archived);
      const savedUndupd = removeDuplicates(savedVideos);
      console.log(savedVideos.length, savedUndupd.length);
      const archivedVideos = videos.filter(video => video.archived);
      const archivedVideosUndupd = removeDuplicates(archivedVideos);
      console.log(archivedVideos.length, archivedVideosUndupd.length);

      res.status(200).json({savedVideos: savedUndupd, archivedVideos: archivedVideosUndupd});
    })
    .catch(next);
}

function removeDuplicates(videos) {
  const videoIds = videos.map(video => video.videoId);
  const undupdIds = [];
  const undupdVideos = [];

  for (var i = 0; i < videoIds.length; i++) {
    const video = videoIds[i];
    if (!undupdIds.includes(video)) {
      undupdIds.push(video);
    }
  }

  for (var j = 0; j < undupdIds.length; j++) {
    const video = videos.find(video => video.videoId === undupdIds[j]);
    undupdVideos.push(video);
  }

  return undupdVideos;
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
  create: videosCreate,
  index: videosIndex,
  update: videosUpdate,
  delete: videosDelete
};

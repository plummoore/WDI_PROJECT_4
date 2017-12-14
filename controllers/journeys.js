const Journey = require('../models/journey');

function journeysCreate(req, res, next) {
  req.body.createdBy = req.params.id;

  Journey
    .create(req.body)
    .then(journey => res.status(200).json(journey))
    .catch(next);
}

function journeysShow(req, res, next) {
  Journey
    .findById(req.params.journeyId)
    .populate('videos journeys.videos journeys')
    .exec()
    .then((journey) => {
      if(!journey) return res.notFound();
      const videos = journey.videos.filter(savedVideo => !savedVideo.archived);
      res.json({journey, videos});
    })
    .catch(next);
}

function journeysUpdate(req, res, next) {
  Journey
    .findById(req.params.journeyId)
    .exec()
    .then(journey => {
      if (!journey) return res.status(404).json({ message: 'Journey not found.'});
      for (const field in req.body) {
        journey[field] = req.body[field];
      }
      return journey.save();
    })
    .then(journey => {
      return res.status(200).json(journey);
    })
    .catch(next);
}

function journeysDelete(req, res, next) {
  Journey
    .findById(req.params.journeyId)
    .exec()
    .then((journey) => {
      if(!journey) return res.status(404).json({ message: 'Journey not found'});
      journey.remove();
    })
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(next);
}

// function journeysUserIndex(req, res, next) {
//   Journey
//     .find()
//     .exec()
//     .then(journeys => {
//       if(req.journey.createdBy !== req.params.id) return res.status(404).json({ message: 'No journeys found'});
//       return res.status(200).json(journeys);
//     })
//     .catch(next);
// }

module.exports = {
  create: journeysCreate,
  show: journeysShow,
  update: journeysUpdate,
  delete: journeysDelete
  // index: journeysUserIndex
};

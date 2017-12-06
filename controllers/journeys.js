const User = require('../models/user');

function journeysCreate(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found.' });
      user.journeys.push(req.body);
      user.save();
      return res.status(201).json(user);
    })
    .catch(next);
}

function journeysShow(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found.' });
      const journey = user.journeys.id(req.params.journeyId);
      return res.status(200).json(journey);
    })
    .catch(next);
}

function journeysUpdate(req, res, next) {

  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found.'});
      const journey = user.journeys.id(req.params.journeyId);
      for (const field in req.body) {
        journey[field] = req.body[field];
      }
      return user.save();
    })
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(next);
}

function journeysDelete(req, res, next) {

  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found.'});
      const journey = user.journeys.id(req.params.journeyId);
      // user.journeys.splice(user.journeys.indexOf(journey), 1)
      journey.remove();
      return user.save();
    })
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(next);
}


module.exports = {
  create: journeysCreate,
  show: journeysShow,
  update: journeysUpdate,
  delete: journeysDelete
};

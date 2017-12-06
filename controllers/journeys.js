const User = require('../models/user');

function journeysCreate(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found.' });
      user.journeys.push(req.body); // not needed if embedded?
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

module.exports = {
  create: journeysCreate,
  show: journeysShow
};

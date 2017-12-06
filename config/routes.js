const express = require('express');
const router = express.Router();

const users = require('../controllers/users');
const journeys = require('../controllers/journeys');
//ADD OTHER CONTROLLERS HERE

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/users/:id/journeys')
  .post(journeys.create);

router.route('/users/:id/journeys/:journeyId')
  .get(journeys.show)
  .put(journeys.update)
  .delete(journeys.delete);

module.exports = router;

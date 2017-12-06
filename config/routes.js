const express = require('express');
const router = express.Router();

const users = require('../controllers/users');
const journeys = require('../controllers/journeys');
const videos = require('../controllers/videos');


//USERS
router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

//JOURNEYS
router.route('/users/:id/journeys')
  .post(journeys.create);

router.route('/users/:id/journeys/:journeyId')
  .get(journeys.show)
  .put(journeys.update)
  .delete(journeys.delete)
  .post(videos.create);


//VIDEOS
router.route('/users/:id/journeys/:journeyId/videos/:videoId')
  .put(videos.update)
  .delete(videos.delete);

module.exports = router;

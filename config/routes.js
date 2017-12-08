const express = require('express');
const router = express.Router();

const users = require('../controllers/users');
const journeys = require('../controllers/journeys');
const videos = require('../controllers/videos');
const auth = require('../controllers/auth');


// USERS
router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

//JOURNEYS
router.route('/users/:id/journeys')
  .post(journeys.create);
// .get(journeys.index);

// router.route('/users/:id/journeys/:journeyId')
router.route('/journeys/:journeyId')
  .get(journeys.show)
  .put(journeys.update)
  .delete(journeys.delete)
  .post(videos.create);


//VIDEOS
router.route('/videos/:videoId')
  .put(videos.update)
  .delete(videos.delete);

router.route('/users/:id/allvideos')
  .get(videos.index);

//AUTH
router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

module.exports = router;

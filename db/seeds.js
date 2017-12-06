const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI, {useMongoClient: true});

const User = require('../models/user');
const Video = require('../models/video');

Video.collection.drop();
User.collection.drop();

User
  .create([{
    username: 'Minnie',
    email: 'm@m.com',
    password: 'password',
    passwordConfirmation: 'password',
    journeys: [{
      name: 'Morning commute',
      route: {
        mode: 'Walking',
        start: 'N18AL',
        end: 'SW151DP',
        distanceMiles: '4.5',
        distanceMetres: 4000,
        durationMins: '45',
        durationSecs: 4500
      },
      regular: true
    }]
  }])
  .then(users => {
    console.log(`${users.length} users created`);

    return Video
      .create([{
        name: 'VIDEO ONE',
        archived: false,
        videoId: '_QdPW8JrYzQ',
        createdBy: users[0].id,
        journey: users[0].journeys[0].id
      }, {
        name: 'VIDEO TWO',
        archived: true,
        videoId: '_QdPW8JrYTT',
        createdBy: users[0].id,
        journey: users[0].journeys[0].id
      }, {
        name: 'VIDEO THREE',
        archived: true,
        videoId: '_QdPrr8JrYTT',
        createdBy: users[0].id,
        journey: users[0].journeys[0].id
      }]);
  })
  .then(videos => console.log(`${videos.length} videos created`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');

const User = require('../models/user');
const Journey = require('../models/journey');
const Video = require('../models/video');

mongoose.connect(dbURI, {useMongoClient: true})
  .then(db => db.dropDatabase())
  .then(() => User
    .create([{
      username: 'Minnie',
      email: 'm@m.com',
      password: 'password',
      passwordConfirmation: 'password'
    }]))
  .then(users => {
    console.log(`${users.length} users created`);

    return Journey
      .create([{
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
        regular: true,
        createdBy: users[0]
      }])
      .then(journeys => {
        console.log(`${journeys.length} journeys created`);

        return Video
          .create([{
            name: 'VIDEO ONE',
            archived: false,
            videoId: '_QdPW8JrYzQ',
            createdBy: users[0],
            journey: journeys[0]
          }, {
            name: 'VIDEO TWO',
            archived: true,
            videoId: '_QdPW8JrYTT',
            createdBy: users[0],
            journey: journeys[0]
          }, {
            name: 'VIDEO THREE',
            archived: true,
            videoId: '_QdPrr8JrYTT',
            createdBy: users[0],
            journey: journeys[0]
          }]);
      });
  })
  .then(videos => console.log(`${videos.length} videos created`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());

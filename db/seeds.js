const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI, {useMongoClient: true});

const User = require('../models/user');
const Journey = require('../models/journey');
const Video = require('../models/video');

User.collection.drop();
Journey.collection.drop();
Video.collection.drop();

User
  .create([{
    username: 'Minnie',
    email: 'm@m.com',
    password: 'password'
    // journeys: [journeySchema]
  }])
  .then(users => {
    console.log(`${users.length} users created`);

    return Journey
      .create([{
        name: 'Morning commute',
        route: {
          mode: 'Walking',
          start: 'Angel',
          end: 'Putney',
          distanceMiles: '4.5',
          distanceMetres: 4000,
          durationMins: '45',
          durationSecs: 4500
        },
        regular: true
        // savedVideos: [videoSchema],
      }])
      .then(journeys => {
        console.log(`${journeys.length} journeys created`);

        return Video
          .create([{
            name: 'This is what happens when you reply to spam email | James Veitch',
            archived: false,
            videoId: '_QdPW8JrYzQ'
          }]);
      });
  })
  .then(videos => console.log(`${videos.length} videos created`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());

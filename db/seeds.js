const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI, {useMongoClient: true});

const User = require('../models/user');
const Journey = require('../models/journey');
const Video = require('../models/video');

// Video.collection.remove();
// Journey.collection.remove();
User.collection.drop();

// Video
//   .create([{
//     name: 'This is what happens when you reply to spam email | James Veitch',
//     archived: false,
//     videoId: '_QdPW8JrYzQ'
//   }])
//   .then(videos => {
//     console.log(`${videos.length} videos created`);
//
//     return Journey
//       .create([{
//         name: 'Morning commute',
//         route: {
//           mode: 'Walking',
//           start: 'N18AL',
//           end: 'SW151DP',
//           distanceMiles: '4.5',
//           distanceMetres: 4000,
//           durationMins: '45',
//           durationSecs: 4500
//         },
//         regular: true,
//         savedVideos: [videos[0].id]
//       }]);
//   })
//   .then(journeys => {
//     console.log(`${journeys.length} journeys created`);
//
//     return User
//       .create([{
//         username: 'Minnie',
//         email: 'm@m.com',
//         password: 'password',
//         journeys: [journeys[0].id]
//       }]);
//   })
//   .then(users => console.log(`${users.length} users created`))
//   .catch(err => console.log(err))
//   .finally(() => mongoose.connection.close());

User
  .create([{
    username: 'Minnie',
    email: 'm@m.com',
    password: 'password',
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
      regular: true,
      savedVideos: [{
        name: 'This is what happens when you reply to spam email | James Veitch',
        archived: false,
        videoId: '_QdPW8JrYzQ'
      }]
    }]
  }])
  .then(users => console.log(`${users.length} users created`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI, {useMongoClient: true});

const User = require('../models/user');

User.collection.drop();

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

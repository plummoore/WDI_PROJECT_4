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
      image: 'http://alop.org/wp-content/uploads/2014/12/happy-dog.jpg',
      password: 'password',
      passwordConfirmation: 'password'
    }]))
  .then(users => {
    console.log(`${users.length} users created`);

    return Journey
      .create([{
        name: 'Morning commute',
        start: {
          lat: 51.51,
          lng: -0.09
        },
        end: {
          lat: 51.515,
          lng: -0.0587
        },
        mode: 'TRANSIT',
        distance: 4.5,
        duration: 45,
        regular: true,
        image: 'https://mymodernmet.com/wp/wp-content/uploads/archive/J-WwyVe7B6zjhdFJ00MR_1082106464.jpeg',
        createdBy: users[0]
      }, {
        name: 'Walking the dog',
        start: {
          lat: 51.51,
          lng: -0.09
        },
        end: {
          lat: 51.4333,
          lng: -0.3
        },
        mode: 'WALKING',
        distance: 4.5,
        duration: 45,
        regular: true,
        image: 'http://www.healthysolutionsofsv.com/wp-content/uploads/Screen-Shot-2015-10-31-at-11.52.45-AM-298x300.png',
        createdBy: users[0]
      }, {
        name: 'Visiting Mum',
        start: {
          lat: 51.51,
          lng: -0.09
        },
        end: {
          lat: 51.45,
          lng: -0.2167
        },
        mode: 'DRIVING',
        distance: 4.5,
        duration: 45,
        regular: true,
        image: 'https://hdwallsource.com/img/2014/4/cookies-and-tea-mood-wallpaper-43591-44651-hd-wallpapers.jpg',
        createdBy: users[0]
      }])
      .then(journeys => {
        console.log(`${journeys.length} journeys created`);

        return Video
          .create([{
            // name: 'VIDEO ONE',
            archived: false,
            videoId: 'uq83lU6nuS8',
            createdBy: users[0],
            journey: journeys[0]
          }, {
            // name: 'VIDEO TWO',
            archived: true,
            videoId: 'F2hc2FLOdhI',
            createdBy: users[0],
            journey: journeys[0]
          }, {
            // name: 'VIDEO THREE',
            archived: true,
            videoId: 'N6wjC0sxD2o',
            createdBy: users[0],
            journey: journeys[0]
          }, {
            // name: 'VIDEO FOUR',
            archived: true,
            videoId: 'N6wjC0sxD2o',
            createdBy: users[0],
            journey: journeys[1]
          }, {
            // name: 'VIDEO FIVE',
            archived: true,
            videoId: 'F2hc2FLOdhI',
            createdBy: users[0],
            journey: journeys[1]
          }]);
      });
  })
  .then(videos => console.log(`${videos.length} videos created`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());

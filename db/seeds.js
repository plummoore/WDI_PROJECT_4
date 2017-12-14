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
      image: 'http://www.serialowa.pl/wpr/wp-content/uploads/2015/07/miss-piggy456.jpg',
      password: 'password',
      passwordConfirmation: 'password'
    }]))
  .then(users => {
    console.log(`${users.length} users created`);

    return Journey
      .create([{
        name: 'Morning commute',
        start: {
          lat: 51.5333607,
          lng: -0.10331369999994422
        },
        end: {
          lat: 51.5152149,
          lng: -0.07233180000002903
        },
        startAddress: 'Duncan Terrace, London N1 8AG, UK',
        endAddress: '1, The Relay Building, 114 Whitechapel High St, London E1 7PT, UK',
        duration: 45,
        distance: 4.5,
        mode: 'TRANSIT',
        regular: true,
        image: 'https://mymodernmet.com/wp/wp-content/uploads/archive/J-WwyVe7B6zjhdFJ00MR_1082106464.jpeg',
        createdBy: users[0]
      }, {
        name: 'Walking the dog',
        start: {
          lat: 51.5333607,
          lng: -0.10331369999994422
        },
        end: {
          lat: 51.44638690000001,
          lng: -0.2757727000000614
        },
        startAddress: 'Duncan Terrace, London N1 8AG, UK',
        endAddress: 'Richmond, UK',
        duration: 45,
        distance: 4.5,
        mode: 'WALKING',
        regular: true,
        image: 'http://www.healthysolutionsofsv.com/wp-content/uploads/Screen-Shot-2015-10-31-at-11.52.45-AM-298x300.png',
        createdBy: users[0]
      }, {
        name: 'Visiting Mum',
        start: {
          lat: 51.5333607,
          lng: -0.10331369999994422
        },
        end: {
          lat: 51.5117321,
          lng: -0.12326970000003712
        },
        startAddress: 'Duncan Terrace, London N1 8AG, UK',
        endAddress: 'Covent Garden, London WC2E 8BE, UK',
        duration: 45,
        distance: 4.5,
        mode: 'DRIVING',
        regular: true,
        image: 'https://hdwallsource.com/img/2014/4/cookies-and-tea-mood-wallpaper-43591-44651-hd-wallpapers.jpg',
        createdBy: users[0]
      }, {
        name: 'Big Ben Walk',
        start: {
          lat: 51.5333607,
          lng: -0.10331369999994422
        },
        end: {
          lat: 51.50072919999999,
          lng: -0.12462540000001354
        },
        startAddress: 'Duncan Terrace, London N1 8AG, UK',
        endAddress: 'London SW1A 0AA, UK',
        duration: 45,
        distance: 4.5,
        mode: 'WALKING',
        regular: true,
        image: 'https://s5.favim.com/orig/54/beautiful-bridge-building-lights-Favim.com-528260.jpg',
        createdBy: users[0]
      }])
      .then(journeys => {
        console.log(`${journeys.length} journeys created`);

        return Video
          .create([{
            // name: 'VIDEO ONE',
            archived: true,
            videoId: 'uq83lU6nuS8',
            duration: 'short',
            createdBy: users[0],
            journey: journeys[0]
          }, {
            // name: 'VIDEO TWO',
            archived: false,
            videoId: 'F2hc2FLOdhI',
            duration: 'medium',
            createdBy: users[0],
            journey: journeys[0]
          }, {
            // name: 'VIDEO THREE',
            archived: true,
            videoId: 'N6wjC0sxD2o',
            duration: 'long',
            createdBy: users[0],
            journey: journeys[0]
          }, {
            // name: 'VIDEO FOUR',
            archived: true,
            videoId: 'N6wjC0sxD2o',
            duration: 'short',
            createdBy: users[0],
            journey: journeys[1]
          }, {
            // name: 'VIDEO FIVE',
            archived: false,
            videoId: 'F2hc2FLOdhI',
            duration: 'medium',
            createdBy: users[0],
            journey: journeys[1]
          }, {
            // name: 'VIDEO SIX',
            archived: true,
            videoId: 'sucza6EOIf0',
            duration: 'long',
            createdBy: users[0],
            journey: journeys[2]
          }, {
            // name: 'VIDEO SEVEN',
            archived: false,
            videoId: 'OAK1UIb-Fio',
            duration: 'short',
            createdBy: users[0],
            journey: journeys[2]
          }, {
            // name: 'VIDEO EIGHT',
            archived: true,
            videoId: 'IRVdiHu1VCc',
            duration: 'medium',
            createdBy: users[0],
            journey: journeys[3]
          }, {
            // name: 'VIDEO NINE',
            archived: false,
            videoId: '3gSSNHO1dDs',
            duration: 'long',
            createdBy: users[0],
            journey: journeys[3]
          }]);
      });
  })
  .then(videos => console.log(`${videos.length} videos created`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());

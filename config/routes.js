const express = require('express');
const router = express.Router();

const users = require('../controllers/users');
//ADD OTHER CONTROLLERS HERE

router.route('/users')
  .get(users.index);



module.exports = router;

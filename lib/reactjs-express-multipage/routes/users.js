const express = require('express');
const router = express.Router();
const config = require('../config.js');
const path = require('path');

router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '..', 'src', 'index.html'));
})

router.get('/getUsers', function(req, res, next) {
  // GET/users/ route
  res.send({name:config.admin.name});
});

module.exports = router;

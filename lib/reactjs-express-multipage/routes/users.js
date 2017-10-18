var express = require('express');
var router = express.Router();
var config = require('../config.js');

router.get('/', function(req, res, next) {
  // GET/users/ route
  res.send({name:config.admin.name});
});

module.exports = router;

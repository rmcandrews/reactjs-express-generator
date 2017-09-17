var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // GET/users/ route
  console.log('hello users');
});

module.exports = router;

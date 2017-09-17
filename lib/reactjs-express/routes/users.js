var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // GET/users/ route
  res.send({name:'ReactJS ExpressJS Generator'});
});

module.exports = router;

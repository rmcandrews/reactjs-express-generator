var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var users = require('./routes/users');

app.use(express.static(__dirname + '/src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', users);

app.use('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'src', 'index.html'));
});

http.createServer(app).listen(3000);

module.exports = app;

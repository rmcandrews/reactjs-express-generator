const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const users = require('./routes/users');

app.use(express.static(__dirname + '/src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', users);

app.use('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'src', 'index.html'));
});

http.createServer(app).listen(3000);

module.exports = app;

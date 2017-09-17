'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var users = require('./routes/users');
var Generator = require('yeoman-generator');

app.use(express.static(__dirname + '/src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', users);

http.createServer(app).listen(3000);

module.exports = class extends Generator {
  install() {
    this.installDependencies();
  }
};

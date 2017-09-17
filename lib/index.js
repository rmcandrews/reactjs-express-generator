var copydir = require('copy-dir');
var currentDir = require('current-dir');

var copy = function() {
  copydir.sync('./reactjs-express', '/');
  return console.log('Copying files to '.grey + currentDir());
};

exports.copy = copy;

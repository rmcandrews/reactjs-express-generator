var copydir = require('copy-dir');
var currentDir = require('current-dir');
var root = require('package.root');

var copy = function() {
  copydir.sync(root.path+'/reactjs-express', '/');
  return console.log('Copying files to '.grey + currentDir());
};

exports.copy = copy;

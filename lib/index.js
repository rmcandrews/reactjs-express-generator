var fs = require('file-system');
var currentDir = require('current-dir');
var root = require('package.root');
var colors = require('colors');

var copy = function() {
  fs.copySync(root.path+'/reactjs-express', currentDir());
  return console.log('\n'+root.path+'\n'+'/reactjs-express'+'Installing '.grey+'ReactJs and ExpressJs '.green+'to: '.grey + colors.cyan(currentDir()));
};

exports.copy = copy;

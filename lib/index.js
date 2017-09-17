var currentDir = require('current-dir');
var colors = require('colors');
var path = require('path');
var fs = require('file-system');
var shell = require('shelljs');

var copy = function() {
  var from = __dirname+'/reactjs-express';
  var to = currentDir();
  console.log('Copying necessary files for '.grey+'ReactJs and ExpressJs '.green+'to '.grey + colors.cyan(to));
  fs.copySync(from, to);
  console.log(colors.magenta('Installing...'));
  shell.exec('npm install', {silent: false});
  console.log('\nInstall finished'.grey+'\n\nRun '.grey+'npm start'.cyan+' to start app'.grey);
  console.log('\nNavigate to '.grey + 'localhost:3000'.cyan + ' in your browser'.grey+'\n');
};

exports.copy = copy;

var currentDir = require('current-dir');
var colors = require('colors');
var path = require('path');
var fs = require('file-system');
var shell = require('shelljs');
var questions = require('questions');
var program = require('commander');

var app, appName, description, userName, userEmail, userUrl, db;

/**
 * Get the users info and app info for creating the package.json file
 * this way we build a tailored package file for the users app and not just
 * boilerplate
 *
 */
var makeApp = function() {
  program
    .version('0.1.0')
    .option('-s, --mysql', 'Mysql Support')
    .option('-m, --mongodb', 'Mongodb Support')
    .option('-r, --router', 'React Router Multipage Support')
    .parse(process.argv);


  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *'.cyan);
  console.log('*                                                                         *'.cyan);
  console.log('*'.cyan + '   Welcome to the ReactJS and ExpressJs Generator                        '.green + '*'.cyan);
  console.log('*                                                                         *'.cyan);
  console.log('*'.cyan + '   First we need to ask you a few questions before you get going.        '.green + '*'.cyan);
  console.log('*'.cyan + '   This is so that we can build all your required files for you thats    '.green + '*'.cyan);
  console.log('*'.cyan + '   tailored to your app                                                  '.green + '*'.cyan);
  console.log('*                                                                         *'.cyan);
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *'.cyan);

  questions.askMany({
    appName: {info:'What is your apps name'},
    description: {info:'Give your app a description'},
    appUrl: {info:'What is your apps url', required: false},
    userName: {info:'What is your name'},
    userEmail: {info:'What is your email', required: false},
    userUrl: {info:'What is your website url', required: false}
  }, function(result){
    app = result;
    appName = app.appName;
    description = app.description;
    appUrl = app.appUrl;
    userName = app.userName;
    userEmail = app.userEmail;
    userUrl = app.userUrl;

    pkg = {
      "name": appName,
      "version": "1.0.0",
      "description": description,
      "homepage": appUrl,
      "author": {
        "name": userName,
        "email": userEmail,
        "url": userUrl,
      },
      "main": "app.js",
      "dependencies": {
        "axios": "^0.16.2",
        "babel-cli": "^6.26.0",
        "babel-core": "^6.26.0",
        "babel-loader": "^7.1.2",
        "babel-plugin-add-module-exports": "^0.2.1",
        "babel-plugin-react-html-attrs": "^2.0.0",
        "babel-plugin-transform-class-properties": "^6.24.1",
        "babel-plugin-transform-decorators-legacy": "^1.3.4",
        "babel-preset-env": "^1.6.0",
        "babel-preset-react": "^6.24.1",
        "babel-preset-stage-0": "^6.24.1",
        "body-parser": "^1.18.1",
        "concurrently": "^3.5.0",
        "cookie-parser": "^1.4.3",
        "debug": "^3.0.1",
        "express": "^4.15.4",
        "node-sass": "^4.5.3",
        "node-sass-middleware": "^0.11.0",
        "path": "^0.12.7",
        "react": "^15.6.1",
        "react-dom": "^15.6.1",
        "request": "^2.81.0",
        "uglifycss": "0.0.27",
        "webpack": "^3.6.0"
      },
      "scripts": {
        "minify-css": "uglifycss src/public/css/main.css > src/public/css/main.min.css",
        "styles": "node-sass --include-path src src/scss/main.scss -o src/public/css/ --watch",
        "server": "nodemon app.js",
        "react": "webpack -d --watch",
        "start": "concurrently \"npm run react\" \"npm run styles\" \"npm run minify-css\" \"npm run server\""
      }
    };

    if (program.mysql) {
      pkg.dependencies['mysql'] = '^2.14.1';
    }

    if (program.mongodb){
      pkg.dependencies['express-mongoose'] = '^0.1.0';
      pkg.dependencies['mongodb'] = '^2.2.31';
    }

    if (program.router){
      pkg.dependencies['react-router-dom'] = '^4.2.2';
    }

    createPackage(pkg, program);
  });
}

var createPackage = function(pkg, program) {
  fs.writeFile(currentDir() + '/package.json', JSON.stringify(pkg, null, 2), function (err) {
    if (err) return console.log(err);
    console.log('package.json file created successfully for '.grey + appName.cyan);
    console.log('this file is where all your dependencies will live as well as your');
    console.log('app\'s information that you entered above');
    console.log();
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'.cyan);
    console.log();

    createConfigFile(pkg, program);
  });
}

var createConfigFile = function(pkg, program) {

  var cfg = 'var config = {};\n\nconfig.admin={};\n\nconfig.app={};\n\nconfig.admin.name="'+userName+'";\nconfig.admin.email="'+userEmail+
  '";\nconfig.app.name="'+appName+'";\nconfig.app.url="'+appUrl+'";\n\nmodule.exports=config';

  fs.writeFile(currentDir() + '/config.js', cfg, function (err) {
    if (err) return console.log(err);
    console.log('config.json file created successfully for '.grey + appName.cyan);
    console.log('this file will be where you can store your database credentials');
    console.log('and also where you can store global variables that don\'t change');
    console.log();
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'.cyan);
    console.log();

    installNpmDependencies(pkg, program);
  });
}

var installNpmDependencies = function(pkg, program) {
  if(program.router) {
    var from = __dirname+'/reactjs-express-multipage';
  } else {
    var from = __dirname+'/reactjs-express';
  }
  var to = currentDir();
  console.log('Copying necessary files for '.grey+'ReactJs and ExpressJs '.green+'to '.grey + colors.cyan(to));
  console.log();
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'.cyan);
  console.log();
  fs.copySync(from, to);
  console.log(colors.magenta('Installing...'));
  shell.exec('npm install', {silent: false});
  console.log('\nInstall finished'.grey+'\n\nRun '.grey+'npm start'.cyan+' to start app'.grey);
  console.log('\nNavigate to '.grey + 'localhost:3000'.cyan + ' in your browser'.grey+'\n');
}

exports.makeApp = makeApp;

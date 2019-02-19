const currentDir = require("current-dir");
const colors = require("colors");
const path = require("path");
const fs = require("file-system");
const shell = require("shelljs");
const questions = require("questions");
const program = require("commander");

var app, appName, description, userName, userEmail, userUrl, db;

/**
 * Get the users info and app info for creating the package.json file
 * this way we build a tailored package file for the users app and not just
 * boilerplate
 *
 */
var makeApp = () => {
  program
    .version("0.1.0")
    .option("-s, --mysql", "Mysql Support")
    .option("-m, --mongodb", "Mongodb Support")
    .option("-p, --postgres", "Postgres Support")
    .option("-x, --multipage", "React Router Multipage Support")
    .option("-r, --route [routeName]", "React Router Generator")
    .parse(process.argv);

  if (program.route) {
    // if a user is just using the generator to create a new route
    routeGenerator(program.route);
  } else {
    // not creating a route, generate app
    console.log(
      "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *"
        .cyan
    );
    console.log(
      "*                                                                         *"
        .cyan
    );
    console.log(
      "*".cyan +
        "                 Welcome to Regen                                       "
          .green +
        "*".cyan
    );
    console.log(
      "*                                                                         *"
        .cyan
    );
    console.log(
      "*".cyan +
        "   First we need to ask you a few questions before you get going.        "
          .green +
        "*".cyan
    );
    console.log(
      "*".cyan +
        "   This is so that we can build all your required files for you thats    "
          .green +
        "*".cyan
    );
    console.log(
      "*".cyan +
        "   tailored to your app                                                  "
          .green +
        "*".cyan
    );
    console.log(
      "*                                                                         *"
        .cyan
    );
    console.log(
      "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *"
        .cyan
    );

    questions.askMany(
      {
        appName: { info: "What is your apps name" },
        description: { info: "Give your app a description" },
        appUrl: { info: "What is your apps url", required: false },
        userName: { info: "What is your name" },
        userEmail: { info: "What is your email", required: false },
        userUrl: { info: "What is your website url", required: false }
      },
      result => {
        app = result;
        appName = app.appName;
        description = app.description;
        appUrl = app.appUrl;
        userName = app.userName;
        userEmail = app.userEmail;
        userUrl = app.userUrl;

        pkg = {
          name: appName,
          version: "1.0.0",
          description: description,
          homepage: appUrl,
          author: {
            name: userName,
            email: userEmail,
            url: userUrl
          },
          main: "app.js",
          dependencies: {
            axios: "^0.18.0",
            "body-parser": "^1.18.3",
            concurrently: "^4.1.0",
            "cookie-parser": "^1.4.3",
            debug: "^4.1.0",
            express: "^4.16.4",
            "node-sass": "^4.5.3",
            "node-sass-middleware": "^0.11.0",
            path: "^0.12.7",
            react: "^16.6.3",
            "react-dom": "^16.6.3"
          },
          devDependencies: {
            "@babel/cli": "^7.0.0",
            "@babel/core": "^7.0.0",
            "@babel/node": "^7.0.0",
            "babel-loader": "^8.0.0",
            "babel-plugin-add-module-exports": "^0.2.1",
            "babel-plugin-react-html-attrs": "^2.0.0",
            "@babel/plugin-proposal-export-default-from": "^7.0.0",
            "@babel/plugin-proposal-class-properties": "^7.0.0",
            "@babel/plugin-proposal-decorators": "^7.0.0",
            "@babel/plugin-proposal-do-expressions": "^7.0.0",
            "@babel/plugin-proposal-export-default-from": "^7.0.0",
            "@babel/plugin-proposal-export-namespace-from": "^7.0.0",
            "@babel/plugin-proposal-function-bind": "^7.0.0",
            "@babel/plugin-proposal-function-sent": "^7.0.0",
            "@babel/plugin-proposal-json-strings": "^7.0.0",
            "@babel/plugin-proposal-logical-assignment-operators": "^7.0.0",
            "@babel/plugin-proposal-nullish-coalescing-operator": "^7.0.0",
            "@babel/plugin-proposal-numeric-separator": "^7.0.0",
            "@babel/plugin-proposal-optional-chaining": "^7.0.0",
            "@babel/plugin-proposal-pipeline-operator": "^7.0.0",
            "@babel/plugin-proposal-throw-expressions": "^7.0.0",
            "@babel/plugin-syntax-dynamic-import": "^7.0.0",
            "@babel/plugin-syntax-import-meta": "^7.0.0",
            "@babel/preset-env": "^7.0.0",
            "@babel/preset-react": "^7.0.0",
            "css-loader": "^0.28.7",
            nodemon: "^1.18.7",
            "sass-loader": "^6.0.6",
            "style-loader": "^0.19.0",
            "styles-loader": "^1.0.0",
            "url-loader": "^0.6.2",
            webpack: "^4.26.1",
            "webpack-cli": "^3.1.2",
            "webpack-dev-server": "^3.1.10",
            "webpack-stream": "^5.2.1"
          },
          scripts: {
            server: "nodemon app.js --exec babel-node",
            react: "webpack",
            start: 'concurrently "npm run react" "npm run server"'
          }
        };

        if (program.mysql) {
          pkg.dependencies["mysql"] = "^2.14.1";
        }

        if (program.mongodb) {
          pkg.dependencies["mongoose"] = "^4.13.7";
          pkg.dependencies["mongodb"] = "^2.2.31";
        }

        if (program.postgres) {
          pkg.dependencies["pg"] = "^7.4.0";
        }

        if (program.multipage) {
          pkg.dependencies["react-router-dom"] = "^4.2.2";
        }

        createPackage(pkg, program);
      }
    );
  }
};

/**
 * routeGenerator takes in a route name, from the root directory it will find
 * /routes and add a new route there
 * @param  {string} route the route name
 * @return {string} success
 */
var routeGenerator = route => {
  console.log("Generating route".grey, route.cyan);

  // stub out a basic route file inner
  var routeInner =
    "const express = require('express');\nconst router = express.Router();\nconst config = require('../config.js');\n\nrouter.get('/', function(req, res, next) {\n\n});\n\nmodule.exports = router;";

  // give the filename the same as the router name
  var fileName = route + ".js";

  // write the file
  fs.writeFile("./routes/" + fileName, routeInner, err => {
    if (err) {
      console.log(
        "There was an error writing the file".red,
        fileName.yellow,
        err.yellow
      );
    } else {
      console.log("Route file created into ./routes/".cyan + fileName.green);

      updateAppFile();
    }
  });

  var updateAppFile = () => {
    var edit = (idx, rem, str) => {
      return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    };

    // read the app.js file to modify and add the route there too
    fs.readFile("./app.js", "utf-8", (err, data) => {
      if (err) console.log("There was an error reading the app.js file");

      var appendRouteLoc = data.search("app.use");
      var routeLocItem =
        "// regen generated route " +
        route +
        "\nconst " +
        route +
        " = require('./routes/" +
        route +
        "');\n\n";

      var updatedAppFile = [
        data.slice(0, appendRouteLoc),
        routeLocItem,
        data.slice(appendRouteLoc)
      ].join("");

      var appendUseLoc = updatedAppFile.search("http.createServer");
      var useLocItem =
        "// regen generated route " +
        route +
        "\napp.use('/" +
        route +
        "', " +
        route +
        ")\n\n";

      updatedAppFile = [
        updatedAppFile.slice(0, appendUseLoc),
        useLocItem,
        updatedAppFile.slice(appendUseLoc)
      ].join("");

      fs.writeFile("./app.js", updatedAppFile, err => {
        if (err) {
          console.log(
            "There was an error updating the app.js file".red,
            err.yellow
          );
        } else {
          console.log("App.js file updated".cyan);
          console.log("Finished generating route".grey, route.green);
        }
      });
    });
  };
};

var createPackage = (pkg, program) => {
  fs.writeFile(
    currentDir() + "/package.json",
    JSON.stringify(pkg, null, 2),
    function(err) {
      if (err) return console.log(err);
      console.log(
        "package.json file created successfully for ".grey + appName.cyan
      );
      console.log(
        "this file is where all your dependencies will live as well as your"
      );
      console.log("app's information that you entered above");
      console.log();
      console.log(
        "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -".cyan
      );
      console.log();

      createConfigFile(pkg, program);
    }
  );
};

var createConfigFile = (pkg, program) => {
  var cfg =
    'var config = {};\n\nconfig.admin={};\n\nconfig.app={};\n\nconfig.admin.name="' +
    userName +
    '";\nconfig.admin.email="' +
    userEmail +
    '";\nconfig.app.name="' +
    appName +
    '";\nconfig.app.url="' +
    appUrl +
    '";\n\nmodule.exports=config';

  fs.writeFile(currentDir() + "/config.js", cfg, err => {
    if (err) return console.log(err);
    console.log(
      "config.json file created successfully for ".grey + appName.cyan
    );
    console.log(
      "this file will be where you can store your database credentials"
    );
    console.log(
      "and also where you can store global variables that don't change"
    );
    console.log();
    console.log(
      "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -".cyan
    );
    console.log();

    installNpmDependencies(pkg, program);
  });
};

var installNpmDependencies = (pkg, program) => {
  if (program.multipage) {
    var from = __dirname + "/reactjs-express-multipage";
  } else {
    var from = __dirname + "/reactjs-express";
  }
  var to = currentDir();
  console.log(
    "Copying necessary files for ".grey +
      "ReactJs and ExpressJs ".green +
      "to ".grey +
      colors.cyan(to)
  );
  console.log();
  console.log(
    "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -".cyan
  );
  console.log();
  fs.copySync(from, to);
  console.log(colors.magenta("Installing..."));
  shell.exec("npm install", { silent: false });
  console.log(
    "\nInstall finished".grey +
      "\n\nRun ".grey +
      "npm start".cyan +
      " to start app".grey
  );
  console.log(
    "\nNavigate to ".grey +
      "localhost:3000".cyan +
      " in your browser".grey +
      "\n"
  );
};

exports.makeApp = makeApp;

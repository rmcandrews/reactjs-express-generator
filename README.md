![NPM](https://img.shields.io/npm/l/reactjs-express-generator.svg?style=flat)
![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/kevin-wynn/reactjs-express-generator.svg?style=flat)
![npm](https://img.shields.io/npm/dm/reactjs-express-generator.svg?style=flat)
![GitHub last commit](https://img.shields.io/github/last-commit/kevin-wynn/reactjs-express-generator.svg?style=flat)
![GitHub commit activity the past month](https://img.shields.io/github/commit-activity/m/kevin-wynn/reactjs-express-generator.svg?style=flat)

# reactjs-express-generator

This generator is a simple lightweight way to set up a skeleton for a React front end with an Express back end.

#### To install run:
- `npm install -g reactjs-express-generator`
- `regen` in the directory you want to install your app in

#### Optional database support flags:
- `--mysql` for mysql support
- `--mongodb` for mongodb support
- `--postgres` for postgres support

#### Optional multi-page app support flags:
- `--multipage` for multi-page support

Example for mysql project would look like:
`regen --mysql --multipage`

#### Route Generation
- `regen -r [routeName]` to create a route from the root directory

**PLEASE NOTE**
There are various bugs with the route generation, these will be resolved with time as I can get around to making changes. But for now you should be aware of the following:
1. If you add an existing route - it will not check for existing routes of the same name and make duplicates
1. This generator is very stupid in the sense that it relies on certain existing variables in `app.js` from the generators initial build of an app
1. It doesn't check for existing route files and may overwrite your existing routes if they have the same name

**Please file any bugs on the github project, please create branches and pull requests when adding new features, bug fixes, or improvements**

The app will create a config.js file in the root directory - this is where you can store global variables that don't change as well as secure api keys you dont want to share, database credentials, etc.

When the app gets generated it uses the config file in the `users.js` route for the name

**Updated 2/2/18:** As of now you can use the generator to create routes within your app. Currently its in a very beta version that is heavily reliant upon using the same file structure the generator creates.

In order to run the generator, within your apps `root` directory run `regen -r [routeName]` and it will create a route in `./routes/` and add the route to your `app.js` file.

**Update 11/17/17:** As of now the styles are all handled through webpack as they should be. You can see the loaders in the `webpack.config.js` file. As well as notice the one required import of styles in `index.jsx` #`import './../scss/main.scss';`.

### File structure (single page app):
```
app
└───routes
│   │   users.js
│   
└───src
│   │   index.html
│   └───app
│       │   index.jsx
│   └───public
│       │   client.min.js
│       └───css
│           │   main.css
│           │   main.min.css
│   └───scss
│       │   _fonts.scss
│       │   main.scss
│    
│   README.md
│   webpack.config.js
│   package.json
│   LICENSE
│   config.js
│   app.js
```

### File structure (multi page app):
```
app
└───routes
│   │   users.js
│   
└───src
│   │   index.html
│   └───app
│       │   index.jsx
│       └───components
│           │   User.jsx
│       └───pages
│           │   Home.jsx
│   └───public
│       │   client.min.js
│       └───css
│           │   main.css
│           │   main.min.css
│   └───scss
│       │   _fonts.scss
│       │   main.scss
│    
│   README.md
│   webpack.config.js
│   package.json
│   LICENSE
│   config.js
│   app.js
```

### File descriptions:
- `routes/users.js` contains a boilerplate route for hitting /users server point
- `src/index.html` the base app page
- `src/app/index.jsx` the reactJS base index file
- *OPTIONAL* `src/app/components/User.jsx` the User component
- *OPTIONAL* `src/app/pages/Home.jsx` the Home page component page
- `src/public/client.min.js` the compiled reactJS code that is called from `index.html`
- `src/public/css/main.min.css` the minified css compiled from the `scss` directory
- `src/public/css/main.css` the pretty css compiled from the `scss` directory
- `src/scss/_fonts.scss` the fonts set up scss file
- `src/scss/main.scss` the main scss file that gets minified and compiled to css
- `README.md` the readme file
- `webpack.config.js` the reactJS environment setup file
- `package.json` the packaged setup
- `config.js` your app config file
- `app.js` the server file

[Read Wiki and Documentation](https://github.com/kevin-wynn/reactjs-express-generator/wiki)

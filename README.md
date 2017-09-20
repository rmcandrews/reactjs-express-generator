# reactjs-express-generator

This generator is a simple lightweight way to set up a skeleton for a ReactJS front end with an ExpressJS back end.

To install run:
- `npm -g reactjs-express-generator`
- `rjs-gen` in the directory you want to install your app in

Optional database support flags:
- `--mysql` for mysql support
- `--mongodb` for mongodb support

Example for mysql project would look like:
`rjs-gen --mysql`

The app will create a config.js file in the root directory - this is where you can store global variables that don't change as well as secure api keys you dont want to share, database credentials, etc.

When the app gets generated it uses the config file in the `users.js` route for the name

### File structure:
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
- `src/public/client.min.js` the compiled reactJS code that is called from `index.html`
- `src/public/css/main.min.css` the minified css compiled from the `scss` directory
- `src/scss/_fonts.scss` the fonts set up scss file
- `src/scss/main.scss` the main scss file that gets minified and compiled to css
- `README.md` the readme file
- `webpack.config.js` the reactJS environment setup file
- `package.json` the packaged setup
- `config.js` your app config file
- `app.js` the server file

[Read Wiki and Documentation](https://github.com/kevin-wynn/reactjs-express-generator/wiki)

// require express
const express = require('express');

// create an instance of express
const app = express();

// require cors
const cors = require('cors');

// parse the body of the request
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// create whitelist for cors
const whitelist = ['http://localhost:3500']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
  }
}

// use cors
app.use(cors(corsOptions));

// require cookie-parser
app.use(require('cookie-parser')());

// require user routes
app.use('/', require('./routes/user'));

// export app to be used in app.js
module.exports = app;





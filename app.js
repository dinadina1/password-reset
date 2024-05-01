// require express
const express = require("express");

// create an instance of express
const app = express();

// require cors
const cors = require('cors');

// require cookie parser
const cookieParser = require("cookie-parser");

// use cors to allow cross origin resource sharing
app.use(cors());

// require cookie-parser
app.use(cookieParser());

// parse the body of the request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require user routes
app.use("/", require("./routes/user"));

// export app to be used in app.js
module.exports = app;

// require express
const express = require("express");

// create an instance of express
const app = express();

// require cors
const cors = require('cors');

app.use(cors({
  origin: '*',
  credentials: true
}));

// parse the body of the request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require cookie-parser
app.use(require("cookie-parser")());

// require user routes
app.use("/", require("./routes/user"));

// export app to be used in app.js
module.exports = app;

// require express
const express = require("express");

// create an instance of express
const app = express();

// require cors
// const cors = require('cors');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// parse the body of the request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// create whitelist for cors
// const corsOptions = {
//   origin: '*'
// }

// // use cors
// app.use(cors(corsOptions));

// require cookie-parser
app.use(require("cookie-parser")());

// require user routes
app.use("/", require("./routes/user"));

// export app to be used in app.js
module.exports = app;

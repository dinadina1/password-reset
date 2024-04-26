// require dotenv
require ('dotenv').config();

// assigning environment variable
const PORT = process.env.PORT || 3500;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET_KEY = process.env.SECRET_KEY;

// export the variables
module.exports = {PORT, MONGODB_URI, SECRET_KEY};
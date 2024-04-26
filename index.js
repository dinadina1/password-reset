// require app from ./app.js
const app = require('./app');

// require env varible from ./config
const {PORT, MONGODB_URI} = require('./utilities/config');

// require mongoDB
const {MongoClient} = require('mongodb');

// connect to mongoDB
const client = new MongoClient(MONGODB_URI);
if(client){
    console.log("Connected Database");
}

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

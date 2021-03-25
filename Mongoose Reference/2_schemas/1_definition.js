/*
MongoDB - Schemas
-------------------------------------------------------------------------------------
Each schema maps to a MongoDB collection and defines the shape of the documents within
that collection.

Usage:
node 1_single_connection_handler.js
*/

const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/mindrobe';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
  poolSize: 5,
  serverSelectionTimeoutMS: 3000,
  heartbeatFrequencyMS: 5000,
};

// const db = mongoose.connection;

// Catch database connection and readyState events and handle them
// ------------------------------------------------------------------------------------------------
const connectedToDatabase = () => {
  console.log('Ready...');
};

mongoose.connect(mongoUri, options)
  .then(() => connectedToDatabase())
  // If the initial connect fails, mongoose will NOT automatically try to reconnect.
  .catch((error) => {
    console.log(error.name);
    console.log(error.message);
  });

console.log(Date.now());
console.log(new Date());

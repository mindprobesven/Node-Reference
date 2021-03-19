/* eslint-disable no-multi-spaces */
/*
Connections
-------------------------------------------------------------------------------------
Usage:
node 1_connections.js
*/

const process = require('process');
const mongoose = require('mongoose');

// Handle the MongoDB connection status and automatic reconnect
// ------------------------------------------------------------------------------------------------
const mongoUri = 'mongodb://localhost:27017/mindrobe';

const options = {
  useNewUrlParser: true,
  // Use the new connection management engine
  useUnifiedTopology: true,
  // Use IPv4
  family: 4,
  // Timeout for inital connection attempt, as well as sending operations
  serverSelectionTimeoutMS: 3000,
  // Checks status (readyState) of the connection in intervals
  heartbeatFrequencyMS: 5000,
  // When the connection is lost, try to reconnect
  // This is enabled by default and can be omitted
  // autoReconnect: true,
};

const db = mongoose.connection;

const handleConnectionStatusChange = () => {
  switch (db.readyState) {
  case 0:
    console.log('DB: Disconnected!');
    break;
  case 1:
    console.log('DB: Connected!');
    break;
  case 2:
    console.log('DB: Connecting...');
    break;
  case 3:
    console.log('DB: Disconnecting...');
    break;
  case 4:
    console.log('DB: Invalid credential!');
    break;
  default:
    console.log('DB Error: Unknown readyState!');
  }
};

db.on('connecting', handleConnectionStatusChange)
  .on('connected', handleConnectionStatusChange)
  .on('disconnecting', handleConnectionStatusChange)
  .on('disconnected', handleConnectionStatusChange)
  .on('invalid credentials', handleConnectionStatusChange);

// Detects if the app is restarted or exited and gracefully closes the database connection
// ------------------------------------------------------------------------------------------------
const gracefulExit = () => {
  db.close()
    .then(() => {
      console.log('-'.repeat(50));
      console.log('Connection to MongoDB is closed.');
      process.exit(0);
    })
    .catch((error) => console.log(error));
};

process.on('SIGINT', gracefulExit)
  .on('SIGTERM', gracefulExit)
  .on('SIGUSR2', gracefulExit);

// Connect to MongoDB
// ------------------------------------------------------------------------------------------------
console.log('Connecting to MongoDB...');

const connectedToDatabase = () => {
  console.log('-'.repeat(50));
  console.log('Ready...');
};

mongoose.connect(mongoUri, options)
  .then(() => connectedToDatabase())
  .catch((error) => console.log(error.message));

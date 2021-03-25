/*
MongoDB - Connections
-------------------------------------------------------------------------------------
Mongoose single (default) database connection (mongoose.connect()) with automatic reconnect,
connection status handling, error handling and process signal handling.

Usage:
node 1_single_connection_handler.js
*/

const process = require('process');
const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/mindrobe';

const options = {
  useNewUrlParser: true,
  // Use the new connection management engine
  useUnifiedTopology: true,
  // Use IPv4
  family: 4,
  // The max number of sockets will keep open for this connection (default 5)
  poolSize: 5,
  // Timeout for inital connection attempt, as well as sending operations
  serverSelectionTimeoutMS: 3000,
  // Checks status (readyState) of the connection in intervals
  heartbeatFrequencyMS: 5000,
  // When the connection is lost, try to reconnect
  // This is enabled by default and can be omitted
  // autoReconnect: true,
};

const db = mongoose.connection;

// Catch database connection and readyState events and handle them
// ------------------------------------------------------------------------------------------------
const handleReadyStateStatusChange = () => {
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

const handleConnectionStatusChange = (event) => {
  switch (event) {
  case 'reconnected':
    console.log('DB: Reconnected to database successfully!');
    break;
  case 'reconnectFailed':
    console.log('DB: Re-connect failed!');
    break;
  case 'error':
    console.log('DB: A connection error ocurred!');
    break;
  default:
    console.log('DB Error: Unknown event!');
  }
};

db.on('connecting', handleReadyStateStatusChange)
  .on('connected', handleReadyStateStatusChange)
  .on('disconnecting', handleReadyStateStatusChange)
  .on('disconnected', handleReadyStateStatusChange)
  .on('invalid credentials', handleReadyStateStatusChange);

db.on('reconnected', () => handleConnectionStatusChange('reconnected'))
  .on('reconnectFailed', () => handleConnectionStatusChange('reconnectFailed'))
  .on('error', () => handleConnectionStatusChange('error'));

// Catch process events if the app is restarted or exited and gracefully close the database connection
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
  // If the initial connect fails, mongoose will NOT automatically try to reconnect.
  .catch((error) => {
    console.log(error.name);
    console.log(error.message);
  });

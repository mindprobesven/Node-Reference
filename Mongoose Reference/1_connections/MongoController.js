/* eslint-disable class-methods-use-this */
const process = require('process');
const mongoose = require('mongoose');

class MongoController {
  constructor() {
    this.mongoUri = 'mongodb://localhost:27017/mindrobe';

    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
      serverSelectionTimeoutMS: 3000,
      heartbeatFrequencyMS: 5000,
    };

    this.db = mongoose.connection;

    this.addProcessHandlers();
    this.addConnectionHandlers();
  }

  handleConnectionStatusChange() {
    switch (this.db.readyState) {
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
  }

  addConnectionHandlers() {
    this.db.on('connecting', () => this.handleConnectionStatusChange())
      .on('connected', () => this.handleConnectionStatusChange())
      .on('disconnecting', () => this.handleConnectionStatusChange())
      .on('disconnected', () => this.handleConnectionStatusChange())
      .on('invalid credentials', () => this.handleConnectionStatusChange());
  }

  async connect() {
    return mongoose.connect(this.mongoUri, this.options);
  }

  gracefulExit() {
    this.db.close()
      .then(() => {
        console.log('-'.repeat(50));
        console.log('Connection to MongoDB is closed.');
        process.exit(0);
      })
      .catch((error) => console.log(error));
  }

  addProcessHandlers() {
    process.on('SIGINT', () => this.gracefulExit())
      .on('SIGTERM', () => this.gracefulExit())
      .on('SIGUSR2', () => this.gracefulExit());
  }
}

module.exports = MongoController;

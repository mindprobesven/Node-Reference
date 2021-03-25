const MongoController = require('./MongoController');

const db = new MongoController();

const connectedToDatabase = () => {
  console.log('-'.repeat(50));
  console.log('Ready...');
};

console.log('Connecting to MongoDB...');

db.connect()
  .then(() => connectedToDatabase())
  .catch((error) => console.log(error.message));

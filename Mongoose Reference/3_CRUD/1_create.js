/* eslint-disable no-unreachable */
// MongoDB - Creating Documents
// -------------------------------------------------------------------------------------

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// Example users data set
const users = [
  { first: 'Sven', last: 'Kohn', age: 41 },
  { first: 'Barbara', last: 'Massari', age: 35 },
  { first: 'Valentina', last: 'Kohn', age: 3 },
];

// ------------------------------------------------------------------------------------------------

const userSchema = new Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  age: { type: Number, required: true, min: 0 },
}, {
  timestamps: true,
});

const UserModel = model('User', userSchema);

// ------------------------------------------------------------------------------------------------

const insertOneUser = async () => {
  console.log('Inserting one user');
  const newUserDocument = new UserModel(users[0]);
  // Before the document is saved, it is validated. An error is thrown if validation fails.
  // For example: If the age of user 'Sven' is -1, a ValidationError is thrown.
  // ValidationError: User validation failed: age: Path `age` (-1) is less than minimum allowed value (0).
  return newUserDocument.save();
};

const insertAllUsers = async () => {
  console.log('Inserting all users');
  // Mongoose always validates each document before sending insertMany to MongoDB.
  // If one document has a validation error, no documents will be saved.
  return UserModel.insertMany(users);
};

const cleanCollection = async () => {
  const docCount = await UserModel.countDocuments();
  if (docCount > 0) {
    console.log(`Deleting ${docCount} old documents in users collection`);
    return UserModel.deleteMany({});
  }
  return false;
};

const connectedToDatabase = async () => {
  console.log('Connected to database!');

  try {
    // Delete all documents in the users collection
    await cleanCollection();
    console.log('-'.repeat(50));

    // Insert a single user document
    const insertedUserDocument = await insertOneUser();
    console.log(insertedUserDocument);
    console.log('-'.repeat(50));

    // Insert an array of user documents
    const allInsertedUserDocuments = await insertAllUsers();
    console.log(allInsertedUserDocuments);
    console.log('-'.repeat(50));
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
};

mongoose.connect('mongodb://localhost:27017/mindprobe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => connectedToDatabase())
  .catch((error) => {
    console.log(`${error.name}: ${error.message}`);
  });

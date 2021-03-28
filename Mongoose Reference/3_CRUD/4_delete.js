/* eslint-disable no-multi-spaces */
// MongoDB - Deleting Documents
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

const cleanCollection = async () => {
  const docCount = await UserModel.countDocuments();
  if (docCount > 0) {
    console.log(`Deleting ${docCount} old documents in users collection`);
    return UserModel.deleteMany({});
  }
  return false;
};

const insertSampleDataUsers = async () => {
  console.log('Inserting users sample data documents');
  return UserModel.insertMany(users);
};

const connectedToDatabase = async () => {
  console.log('Connected to database!');

  try {
    // Preparation
    // ---------------------------------------------------
    // Delete all documents in the users collection
    await cleanCollection();
    // Insert an array of user sample data documents
    await insertSampleDataUsers();
    console.log('-'.repeat(50));
    // ---------------------------------------------------

    // Deleting one document with a matching condition
    const resultDeleteOne = await UserModel.deleteOne({ first: /BARbara/i });
    console.log(resultDeleteOne);    // { n: 1, ok: 1, deletedCount: 1 }

    // Deleting many documents with a matching condition
    const resultDeleteMany = await UserModel.deleteMany({ age: { $gte: 10 } });
    console.log(resultDeleteMany);

    // Deleting all documents in a collection
    const resultDeleteAll = await UserModel.deleteMany({});
    console.log(resultDeleteAll);
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

// MongoDB - Creating Documents
// -------------------------------------------------------------------------------------

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// Example users data set
const userWithMissingData = {
  first: 'Thomas',
  last: 'Kohn',
  age: 51,
  // This will still create the likes and skills fields in the document with empty arrays []
  // likes: [],
  // skills: [],
};

const users = [
  {
    first: 'Sven',
    last: 'Kohn',
    age: 41,
    likes: ['Computers', 'Electronics', 'Movies'],
    skills: [
      { skill: 'Coding', level: 10 },
      { skill: 'Electronics', level: 8 },
      { skill: 'AI', level: 7 },
    ],
  },
  {
    first: 'Barbara',
    last: 'Massari',
    age: 35,
    likes: ['Movies', 'Social Media', 'Family'],
    skills: [
      { skill: 'Finance', level: 10 },
      { skill: 'Cooking', level: 3 },
      { skill: 'Painting', level: 6 },
    ],
  },
  {
    first: 'Valentina',
    last: 'Kohn',
    age: 3,
    likes: ['Toys', 'Painting', 'Running'],
    skills: [
      { skill: 'Painting', level: 3 },
      { skill: 'Dancing', level: 5 },
      { skill: 'Singing', level: 6 },
    ],
  },
];

// ------------------------------------------------------------------------------------------------

const userSchema = new Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  age: { type: Number, required: true, min: 0 },
  likes: [String],
  skills: [Object],
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

const connectedToDatabase = async () => {
  console.log('Connected to database!');

  try {
    // Preparation
    // ---------------------------------------------------
    // Delete all documents in the users collection
    await cleanCollection();
    console.log('-'.repeat(50));
    // ---------------------------------------------------

    // Insert a single user document
    // Before the document is saved, it is validated. An error is thrown if validation fails.
    // For example: If the age of user 'Sven' is -1, a ValidationError is thrown.
    // ValidationError: User validation failed: age: Path `age` (-1) is less than minimum allowed value (0).
    const newUserDocument = new UserModel(userWithMissingData);
    const insertedUserDocument = await newUserDocument.save();
    console.log(insertedUserDocument);
    console.log('-'.repeat(50));

    // Insert an array of user documents
    // Mongoose always validates each document before sending insertMany to MongoDB.
    // If one document has a validation error, no documents will be saved.
    const allInsertedUserDocuments = await UserModel.insertMany(users);
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

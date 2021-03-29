/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
// MongoDB - Queries with Lean
// -------------------------------------------------------------------------------------

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// Example users data set
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

    // The 'lean' option tells Mongoose to skip hydrating the result documents.
    // This makes queries faster and less memory intensive, but the result
    // documents are plain old JavaScript objects (POJOs), not Mongoose documents.
    // Enabling the lean option tells Mongoose to skip instantiating a full Mongoose
    // document and just give you the POJO.
    //
    // The downside of enabling lean is that lean docs don't have:
    // Change tracking
    // Casting and validation
    // Getters and setters
    // Virtuals
    // save()
    //
    // When to use lean?
    // Whenever the results of a query don't need to be modifed.
    // For example sending an Express response.
    const leanDocument = await UserModel.findOne({ first: /sven/i }).lean();

    console.log(leanDocument instanceof mongoose.Document);  // false
    console.log(leanDocument.constructor.name);   // Object instead of a model

    console.log(leanDocument);
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

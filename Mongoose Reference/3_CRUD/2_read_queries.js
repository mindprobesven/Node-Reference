/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
// MongoDB - Queries
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

    // Finds a user with first name matching Sven (case-insensitive),
    // selects the 'first' and 'last' fields and unselects the '_id' field.
    const matchingUserDocument = await UserModel
      .findOne({ first: /Sven/i })
      .select('first last -_id');
    console.log(matchingUserDocument);   // { first: 'Sven', last: 'Kohn' }

    console.log('-'.repeat(50));

    // Finding matches in simple arrays
    // ------------------------------------------------------------------------------------------------
    let matchingUserDocuments = await UserModel
    // Finding matches where the field 'likes' value is an array that contains 'movies' as one of its elements.
    // .find({ likes: /movies/i })

    // Finding matches where the field 'likes' value is an array with exactly the query array in the same order
    // .find({ likes: ['Movies', 'Social Media', 'Family'] })

    // Finding matches where the field 'likes' value is an array with all items in the query array without regard to order
    // .find({ likes: { $all: ['Movies', 'Family'] } })

      // Finding matches where the field 'likes' value is an array including either 'movies' or 'painting'
      .find({ likes: { $in: [/movies/i, /painting/i] } })

    // Specify multiple conditions for array elements
    // ----------------------------------------------
    // Finding matches that are greater than 15 or less than 20 or both
    // .find( { dim_cm: { $gt: 15, $lt: 20 } } )

    // Finding matches that are both greater than 15 AND less than 20
    // .find( { dim_cm: { $elemMatch: { $gt: 15, $lt: 20 } } } )
      .select('first last -_id')
      .sort('first');
    console.log(matchingUserDocuments);

    console.log('-'.repeat(50));

    // Finding matches in an array of objects
    // ------------------------------------------------------------------------------------------------
    matchingUserDocuments = await UserModel
    // Specify a 'single' Query condition directly on a Field (skills.skill) in an Array of Objects
    // .find({ 'skills.skill': /painting/i })

      // Specify 'multiple' query conditions on fields in an array of objects
      .find({ skills: { $elemMatch: { skill: /painting/i, level: { $gt: 5 } } } })
      .select('first last -_id')
      .sort('first');
    console.log(matchingUserDocuments);
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

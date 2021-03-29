/* eslint-disable max-len */
// MongoDB - Updating Documents
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

    // Updating using save()
    // ------------------------------------------------------------------------------------------------
    // findOne() returns a Mongoose document. Mongoose documents track changes.
    // You can modify a document and Mongoose will convert it into MongoDB update operators.
    // On save(), Mongoose sends an `updateOne({ _id: doc._id }, { $set: { first: /sven/i } })`
    // With save(), you get full validation and middleware.

    // Query for and retrieve the document to edit
    let documentToEdit = await UserModel.findOne({ first: /sven/i });

    // Option 1: Update using vanilla JS assignments
    // documentToEdit.age = 42;

    // Option 2: Update using set()
    documentToEdit.set({ age: 42 });

    let savedDocument = await documentToEdit.save();
    console.log(savedDocument);
    console.log('-'.repeat(50));

    // Updating using queries
    // ------------------------------------------------------------------------------------------------
    let updateStatus = await UserModel.updateOne(
      { first: /barbara/i },
      { $set: { age: 36 } },
      { runValidators: true },
    );
    console.log(updateStatus);
    console.log('-'.repeat(50));

    // Validation
    // ---------------------------------------------------
    // Mongoose does NOT run validation on query function parameters by default.
    // You need to set runValidators: true
    try {
      updateStatus = await UserModel.updateOne(
        { first: /barbara/i },
        // This will cause a validation error because age has to be at least 0.
        { $set: { age: -1 } },
        { runValidators: true },
      );
      console.log(updateStatus);
      console.log('-'.repeat(50));
    } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      console.log('-'.repeat(50));
    }

    // Updating using findOneAndUpdate()
    // ---------------------------------------------------
    // If a document is found, it returns the original or updated document instead of just the update status
    let updatedDocument = await UserModel
      .findOneAndUpdate(
        { first: /valentina/i },
        { $set: { age: 4 } },
        {
          useFindAndModify: false,
          runValidators: true,
          // Returns the modified document rather than the original
          new: true,
        },
      )
      .select('first last age -_id');
    console.log(updatedDocument);
    console.log('-'.repeat(50));

    // ------------------------------------------------------------------------------------------------

    // Updating document field arrays using save()
    // ---------------------------------------------------
    documentToEdit = await UserModel.findOne({ first: /sven/i });

    // Adding items to an array without uniqueness check.
    // documentToEdit.set({ likes: [...documentToEdit.likes, 'Drones', 'AI'] });

    // Adding items to an array with uniqueness check using Set().
    const currentLikesSet = new Set(documentToEdit.likes);
    const newLikesSet = new Set(['Computers', 'Music', 'AI']);
    const combinedLikeSet = new Set([...currentLikesSet, ...newLikesSet]);

    documentToEdit.set({ likes: [...combinedLikeSet] });

    savedDocument = await documentToEdit.save();
    console.log(savedDocument);
    console.log('-'.repeat(50));

    // Updating document field arrays using queries
    // ---------------------------------------------------
    updatedDocument = await UserModel
      .findOneAndUpdate(
        { first: /valentina/i },
        // Append a single item to an array
        // { $push: { likes: 'Music' } },

        // Append multiple items to an array
        // { $push: { likes: { $each: ['Music', 'AI'] } } },

        // Append multiple items to an array with uniqueness check using $addToSet
        // { $addToSet: { likes: { $each: ['Toys', 'Painting', 'Music', 'AI'] } } },

        // Remove a single item from an array
        // { $pull: { likes: /painting/i } },

        // Remove multiple items from an array
        { $pullAll: { likes: ['Running', 'Toys'] } },
        {
          useFindAndModify: false,
          runValidators: true,
          new: true,
        },
      )
      .select('first last likes -_id');
    console.log(updatedDocument);
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

/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/*
MongoDB - Schemas
-------------------------------------------------------------------------------------
*/

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// Creating a Schema with custom instance methods
// ------------------------------------------------------------------------------------------------
// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const userSchema = new Schema({
  first: String,
  last: { type: String, required: true },
  age: Number,
  activated: { type: Boolean, default: true },
}, {
  // The timestamps option tells mongoose to assign createdAt and updatedAt fields to a schema.
  timestamps: true,
});

// By default, Mongoose adds an _id property to schemas of type ObjectId
console.log(userSchema.path('_id'));
console.log('-'.repeat(50));

// Creating custom instance methods
userSchema.methods.fullName = function () {
  return `${this.first} ${this.last}`;
};

userSchema.methods.getAllUsers = function (cb) {
  return model('User').find({}, cb);
};

// Creating a Model
// ------------------------------------------------------------------------------------------------
// The first argument is the singular name of the collection your model is for. Mongoose automatically
// looks for the plural, lowercased version of your model name. Thus, the model 'User' is for the
// 'users' collection in the database.
const User = model('User', userSchema);

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
const addUser = async () => {
  // Creating a Document from a Model
  const newUser = new User({
    first: 'Sven',
    last: 'Kohn',
    age: 41,
    activated: false,
  });

  // Returns the document object
  console.log(newUser);
  // Returns the full name of the user by using the Schema's instance method
  console.log(newUser.fullName());

  return newUser.save();
};

const getUserlistWithSchemaInstanceMethod = () => {
  return new Promise((resolve, reject) => {
    const userList = new User();
    userList.getAllUsers((error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const connectedToDatabase = async () => {
  console.log('Ready...');

  try {
    const savedUserDocument = await addUser();
    console.log('Document saved!');
    console.log(savedUserDocument);
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  }

  console.log('-'.repeat(50));

  try {
    const userList = await getUserlistWithSchemaInstanceMethod();
    console.log(userList);
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
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

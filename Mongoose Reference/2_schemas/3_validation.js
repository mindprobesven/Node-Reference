// MongoDB - Validation
// -------------------------------------------------------------------------------------

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  // Customizing a validation error message
  age: { type: Number, required: true, min: [1, 'Age has to be minimum 1'] },
  // A custom validator with custom error message
  phone: {
    type: String,
    validate: {
      validator: (value) => /\d{3}-\d{3}-\d{4}/.test(value),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required'],
  },
}, {
  timestamps: true,
});

const UserModel = model('User', userSchema);

const newUserDocument = UserModel(
  {
    first: 'Sven',
    last: 'Kohn',
    age: 41,
    phone: '555-555-5',
  },
);

// Validation is middleware. Mongoose registers validation as a pre('save') hook on every schema by default.
// Validation can also be done manually.
// ------------------------------------------------------------------------------------------------

// Manual validation syncronous
const error = newUserDocument.validateSync();
if (error) console.log(`${error.name}: ${error.message}`);

console.log('-'.repeat(50));

// Manual validation asyncronous
newUserDocument.validate()
  .catch((err) => console.log(`${err.name}: ${err.message}`));

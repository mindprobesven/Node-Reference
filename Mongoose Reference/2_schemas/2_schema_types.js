// MongoDB - Schema types
// -------------------------------------------------------------------------------------

const mongoose = require('mongoose');

const { Schema } = mongoose;

// All Schema types
// ------------------------------------------------------------------------------------------------
// A SchemaType is a configuration object for an individual property.
// SchemaTypes handle the definitions of 'paths' for an individual property.
//
// A list of all Schema Types and additional 'properties' for a path (required, default, etc) at
// https://mongoosejs.com/docs/schematypes.html

const schema = new Schema({
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65 },
  mixed: Schema.Types.Mixed,
  someId: Schema.Types.ObjectId,
  decimal: Schema.Types.Decimal128,
  array: [],
  ofString: [String],
  ofNumber: [Number],
  ofDates: [Date],
  ofBuffer: [Buffer],
  ofBoolean: [Boolean],
  ofMixed: [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  ofArrays: [[]],
  ofArrayOfNumbers: [[Number]],
  nested: {
    stuff: { type: String, lowercase: true, trim: true },
  },
  map: Map,
  mapOfString: {
    type: Map,
    of: String,
  },
});

const Thing = mongoose.model('Thing', schema);

const m = new Thing();
m.name = 'Statue of Liberty';
m.age = 125;
m.updated = new Date();
m.binary = Buffer.alloc(0);
m.living = false;
m.mixed = { any: { thing: 'i want' } };
m.markModified('mixed');
m.someId = new mongoose.Types.ObjectId();
m.array.push(1);
m.ofString.push('strings!');
m.ofNumber.unshift(1, 2, 3, 4);
m.ofDates.addToSet(new Date());
m.ofBuffer.pop();
m.ofMixed = [1, [], 'three', { four: 5 }];
m.nested.stuff = ' GOOD  ';
m.map = new Map([['key', 'value']]);

console.log(m);

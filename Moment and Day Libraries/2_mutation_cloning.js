/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
// -------------------------------------------------------------------------------------------------------
//
// Moment.js and Day.js libraries
//
// Cloning
//
// -------------------------------------------------------------------------------------------------------

const moment = require('moment');
const dayjs = require('dayjs');

// Moment
// -------------------------------------------------------------------------------------------------------
// Warning: All moments are mutable.
const a = moment([2021]);
// Mutates the original moment by adding time.
const b = a.add(1, 'year');

console.log(a.toString());  // Sat Jan 01 2022 00:00:00 GMT+0100 - Problem: was mutated
console.log(b.toString());  // Sat Jan 01 2022 00:00:00 GMT+0100

// Solution: Create a clone. Calling moment() on a moment will clone it.
const a1 = moment([2021]);
// Mutates the original moment by adding time.
const b1 = moment(a1).add(1, 'year');

console.log(a1.toString());  // Fri Jan 01 2021 00:00:00 GMT+0100 - No longer mutated
console.log(b1.toString());  // Sat Jan 01 2022 00:00:00 GMT+0100

// Day.js
// -------------------------------------------------------------------------------------------------------
// All Day.js objects are immutable. Still, dayjs#clone can create a clone of the current object if you need one.
const aD = dayjs(new Date(2010, 1, 14, 15, 25, 50, 125));
const bD = aD.add(1, 'year');

console.log(aD.toString());   // Sun, 14 Feb 2010 14:25:50 GMT
console.log(bD.toString());   // Mon, 14 Feb 2011 14:25:50 GMT

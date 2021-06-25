/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
// -------------------------------------------------------------------------------------------------------
//
// Moment.js and Day.js libraries
//
// Display
//
// -------------------------------------------------------------------------------------------------------

const moment = require('moment');
const dayjs = require('dayjs');

// Formatting the display date and time
// -------------------------------------------------------------------------------------------------------
console.log(moment().format());                                   // 2021-06-25T12:49:20+02:00
console.log(moment().format('dddd, MMMM Do YYYY, h:mm:ss a'));    // Friday, June 25th 2021, 12:48:15 pm

console.log(dayjs().format());                                    // 2021-06-25T12:49:20+02:00
console.log(dayjs().format('dddd, MMMM dddd YYYY, h:mm:ss a'));   // Friday, June Friday 2021, 12:50:42 pm

// Time from and to now
// -------------------------------------------------------------------------------------------------------
const timeFromThisDate1 = moment('2021-06-01').fromNow();
const timeFromThisDate1a = moment('2021-06-01').fromNow(true);  // Removes 'ago'
const timeFromThisDate2 = moment('2021-07-01').fromNow();
const timeFromThisDate3 = moment('2021-07-10').from(moment('2021-07-09'));

console.log(timeFromThisDate1);     // 25 days ago
console.log(timeFromThisDate1a);    // 25 days
console.log(timeFromThisDate2);     // in 5 days
console.log(timeFromThisDate3);     // in a day

const timeToThisDate1 = moment('2021-06-01').toNow();
const timeToThisDate2 = moment('2021-07-10').to(moment('2021-07-11'));

console.log(timeToThisDate1);       // in 25 days
console.log(timeToThisDate2);       // in a day

// -------
// Same for Day.js

// Difference
// -------------------------------------------------------------------------------------------------------
const date1 = moment('2021-06-10');
const date2 = moment('2020-06-05');

// The difference in milliseconds
const difference = date1.diff(date2);
// The difference in days
const differenceDays = date1.diff(date2, 'days');
const differenceYears = date1.diff(date2, 'years');
const differenceYearsFloat = date1.diff(date2, 'years', true);

console.log(difference);              // 31968000000
console.log(differenceDays);          // 370
console.log(differenceYears);         // 1
console.log(differenceYearsFloat);    // 1.0134408602150538

// -------
// Same for Day.js

// Unix Timestamp
// -------------------------------------------------------------------------------------------------------
// Outputs the number of milliseconds since the Unix Epoch
const timestamp = moment('2021-06-10').valueOf();

console.log(timestamp);              // 1623276000000

// -------
// Same for Day.js

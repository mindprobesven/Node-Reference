/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
// -------------------------------------------------------------------------------------------------------
//
// Moment.js and Day.js libraries
//
// Parse and create
//
// -------------------------------------------------------------------------------------------------------

const moment = require('moment');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const arraySupport = require('dayjs/plugin/arraySupport');
const utc = require('dayjs/plugin/utc');

// Now
// -------------------------------------------------------------------------------------------------------
// Returns a fresh object with the current date and time.
console.log(moment());

console.log(dayjs());

// String
// -------------------------------------------------------------------------------------------------------
// The string has to match known ISO 8601 formats
console.log(moment('2021-06-10'));
console.log(moment('2021-03-25T12:00:00Z'));

console.log(dayjs('2021-06-10'));
console.log(dayjs('2021-03-25T12:00:00Z'));

// String + Format
// -------------------------------------------------------------------------------------------------------
console.log(moment('10/25/2021', 'MM-DD-YYYY'));  // Moment<2021-10-25T00:00:00+02:00>

// You may get unexpected results when parsing both date and time. You can use strict mode, which will
// identify the parsing error and set the Moment object as invalid.
//
// You may specify a boolean for the last argument to use strict parsing. Strict parsing requires that the
// format and input match exactly, including delimiters.
console.log(moment('24/12/2019 09:15:00', 'DD/MM/YYYY hh:mm:ss', true)); // Moment<2019-12-24T09:15:00+01:00>
console.log(moment('24/12/2019 09:15:00', 'DD/MM/YYYY hh:mm:ss', true).isValid()); // true

// -------

console.log(dayjs('10/25/2021', 'MM-DD-YYYY'));

// You may specify a boolean for the last argument to use strict parsing. Strict parsing requires that the
// format and input match exactly, including delimiters.
// This dependent on CustomParseFormat plugin to work
dayjs.extend(customParseFormat);
console.log(dayjs('24/12/2019 09:15:00', 'DD/MM/YYYY hh:mm:ss', true));
console.log(dayjs('24/12/2019 09:15:00', 'DD/MM/YYYY hh:mm:ss', true).isValid()); // true

// Unix Timestamp
// -------------------------------------------------------------------------------------------------------
console.log(moment(86400000));
console.log(dayjs(86400000));

// Creates a new date object with a specified date and time
// -------------------------------------------------------------------------------------------------------
// [year, month, day, hour, minute, second, millisecond]
console.log(moment(new Date(2010, 1, 14, 15, 25, 50, 125)).toString());      // Sun Feb 14 2010 15:25:50 GMT+0100
console.log(moment([2010, 1, 14, 15, 25, 50, 125]).toString());              // Sun Feb 14 2010 15:25:50 GMT+0100
console.log(moment([2010, 1, 14, 15, 25, 50, 125]).toISOString());           // 2010-02-14T14:25:50.125Z

// -------

console.log(dayjs(new Date(2010, 1, 14, 15, 25, 50, 125)).toString());       // Sun, 14 Feb 2010 14:25:50 GMT
// This dependent on ArraySupport plugin to work
dayjs.extend(arraySupport);
console.log(dayjs([2010, 1, 14, 15, 25, 50, 125]).toString());               // Sun, 14 Feb 2010 14:25:50 GMT
console.log(dayjs(new Date(2010, 1, 14, 15, 25, 50, 125)).toISOString());    // 2010-02-14T14:25:50.125Z

// UTC
// -------------------------------------------------------------------------------------------------------
// By default parses and displays in local time.
// If you want to parse or display a moment in UTC, you can use utc().

console.log(moment(new Date(2010, 1, 14, 15, 25, 50, 125)).format());       // 2010-02-14T15:25:50+01:00
console.log(moment.utc(new Date(2010, 1, 14, 15, 25, 50, 125)).format());   // 2010-02-14T14:25:50Z

// -------

console.log(dayjs(new Date(2010, 1, 14, 15, 25, 50, 125)).format());       // 2010-02-14T15:25:50+01:00
// This dependent on UTC plugin to work
dayjs.extend(utc);
console.log(dayjs.utc(new Date(2010, 1, 14, 15, 25, 50, 125)).format());   // 2010-02-14T14:25:50Z

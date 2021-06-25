/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
// -------------------------------------------------------------------------------------------------------
//
// Moment.js and Day.js libraries
//
// Maximum and Minimum
//
// -------------------------------------------------------------------------------------------------------

const moment = require('moment');

const birthdays = [
  '22.3.1980',
  '22.2.1980',
  '22.1.1980',
];

const parsedBirthdays = birthdays.map((birthday) => moment(birthday, 'DD.MM.YYYY'));

console.log(parsedBirthdays);

console.log(`Most distant future: ${moment.max(parsedBirthdays).toISOString()}`);
// Most distant future: 1980-03-21T23:00:00.000Z

console.log(`Most distant past: ${moment.min(parsedBirthdays).toISOString()}`);
// Most distant past: 1980-01-21T23:00:00.000Z

// -------

// Same for Dayjs.js, but requires the dependency
// const minMax = require('dayjs/plugin/minMax');
// dayjs.extend(minMax)

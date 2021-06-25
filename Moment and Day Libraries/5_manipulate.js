/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
// -------------------------------------------------------------------------------------------------------
//
// Moment.js and Day.js libraries
//
// Manipulate
//
// -------------------------------------------------------------------------------------------------------

const moment = require('moment');

// Add and subtract time
// -------------------------------------------------------------------------------------------------------
const today = moment().format('DD.MM.YYYY');
const tomorrow = moment(today, 'DD.MM.YYYY').add(1, 'days').format('DD.MM.YYYY');

console.log(today);       // 25.06.2021
console.log(tomorrow);    // 26.06.2021

// -------
// Same for Day.js

// Start and End of time
// -------------------------------------------------------------------------------------------------------
//
// Moment

const currentTime = moment().format('hh:mm:ss');
const startTimeThisHour = moment(currentTime, 'hh:mm:ss').startOf('hour').format('hh:mm:ss');
const endTimeNextHour = moment(currentTime, 'hh:mm:ss').endOf('hour').format('hh:mm:ss');

console.log(currentTime);           // 12:41:44
console.log(startTimeThisHour);     // 12:00:00
console.log(endTimeNextHour);       // 12:59:59

// -------
// Same for Day.js

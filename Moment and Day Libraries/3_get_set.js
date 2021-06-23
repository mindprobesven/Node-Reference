/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
// -------------------------------------------------------------------------------------------------------
//
// Moment.js and Day.js libraries
//
// Get and Set
//
// -------------------------------------------------------------------------------------------------------

const moment = require('moment');
const dayjs = require('dayjs');

// Get
console.log(moment([2022]).year());                                              // 2022
console.log(moment([2022]).get('year'));                                         // 2022
// Set
console.log(moment([2022]).year(2025).format('YYYY'));                           // 2025
console.log(moment([2022]).set('year', 2025).format('YYYY-MM-DD'));              // 2025-01-01
console.log(moment([2022]).set({ year: 2025, month: 6 }).format('YYYY-MM-DD'));  // 2025-07-01

// -------

// Get
console.log(dayjs([2022]).year());                                              // 2022
console.log(dayjs([2022]).get('year'));                                         // 2022
// Set
console.log(dayjs([2022]).year(2025).format('YYYY'));                           // 2025
console.log(dayjs([2022]).set('year', 2025).format('YYYY-MM-DD'));              // 2025-01-01

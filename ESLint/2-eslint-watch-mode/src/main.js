const add = require('./utils/add');

const a = 1;
const b = 5;

const sum = add(a, b);

console.log(`Running in ${process.env.NODE_ENV} mode`);
console.log(sum);
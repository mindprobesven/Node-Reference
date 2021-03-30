/*
Route handlers with callback functions
-------------------------------------------------------------------------------------
*/

const express = require('express');

const app = express();
const port = 3000;

const cb0 = (req, res, next) => {
  console.log('CB0');
  next();
};

const cb1 = (req, res, next) => {
  console.log('CB1');
  next();
};

// An array of callback functions can handle a route.
app.get('/example/d', [cb0, cb1], (req, res, next) => {
  // Execution sequence:
  // 1. cb0
  // 2. cb1
  // 3. The console.log message and next()
  // 4. res.send()
  console.log('the response will be sent by the next function ...');
  next();
}, (req, res) => {
  res.send('Hello from D!');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

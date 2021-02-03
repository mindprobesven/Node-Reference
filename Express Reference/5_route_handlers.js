/*
Route handlers
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
  console.log('the response will be sent by the next function ...');
  next();
}, (req, res) => {
  res.send('Hello from D!');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

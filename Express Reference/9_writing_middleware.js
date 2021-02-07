/*
Writing middleware
-------------------------------------------------------------------------------------
*/

const express = require('express');

const app = express();
const port = 3000;

const myLogger = (req, res, next) => {
  console.log('LOGGED');
  next();
};

const requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

const configurableMiddleware = (options) => (req, res, next) => {
  console.log(options.destroy); // Output: true
  next();
};

// Every time the app receives a request, it calls the middleware function 'myLogger'
app.use(myLogger);
// This middleware function adds a property called requestTime to the request object
app.use(requestTime);
// Defining a middleware with options (object or params)
app.use(configurableMiddleware({ destroy: true }));

app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>';
  responseText += `<small>Requested at: ${req.requestTime} </small>`;
  res.send(responseText);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

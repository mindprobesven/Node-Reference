/*
Error handling
-------------------------------------------------------------------------------------
*/

const express = require('express');

const app = express();
const port = 3000;

if (process.env.NODE_ENV === 'production') {
  console.log('Production mode');
} else {
  console.log('Development mode');
}

const defaultErrorHandler = (err, req, res, next) => {
  console.log('Default error handler');
  console.error(err.stack);
  res.status(500).send('Default error handler');
};

/*
Synchronous functions
------------------------------------------------------------------------------------
*/

app.get('/1', (req, res) => {
  // This will be caught by defaultErrorHandler middleware
  throw new Error('Default error catching');
});

app.get('/2', (req, res) => {
  try {
    throw new Error('Custom error catching');
  } catch (err) {
    console.log(err);
    res.status(500).send('Custom error catching');
  }
});

/*
Asynchronous functions
------------------------------------------------------------------------------------
*/

// Promise
app.get('/3', (req, res, next) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Promise error catching with default error handler')), 2000);
  });

  /* Errors returned from asynchronous functions invoked by route handlers and middleware,
  you must pass them to the next() function, where Express will catch and process them. */
  promise.then((value) => console.log(value)).catch((err) => next(err));
  // Short version
  // promise.then((value) => console.log(value)).catch(next);
});

// Async / await
const getDelayedData = async () => new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('Async error catching with default error handler')), 2000);
});

app.get('/4', async (req, res, next) => {
  try {
    const data = await getDelayedData();
    console.log(data);
  } catch (err) {
    /* Errors returned from asynchronous functions invoked by route handlers and middleware,
    you must pass them to the next() function, where Express will catch and process them. */
    next(err);
  }
});

// ------------------------------------------------------------------------------------
// Note! Define error-handling middleware last, after other app.use() and routes calls
// ------------------------------------------------------------------------------------
app.use(defaultErrorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

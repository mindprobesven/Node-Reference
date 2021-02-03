/*
Chained route handlers
-------------------------------------------------------------------------------------
*/

const express = require('express');

const app = express();
const port = 3000;

// You can create chainable route handlers for a route path by using app.route()
app.route('/book')
  .get((req, res) => {
    res.send('Get a book');
  })
  .post((req, res) => {
    res.send('Add a book');
  })
  .put((req, res) => {
    res.send('Update the book');
  });

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

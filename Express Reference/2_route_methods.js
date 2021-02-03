/*
Route methods
-------------------------------------------------------------------------------------
*/

const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

app.post('/', (req, res) => {
  res.send('POST request to the homepage');
});

app.delete('/', (req, res) => {
  res.send('DELETE request to the homepage');
});

/* Executed for requests to the route “/section whether using
GET, POST, PUT, DELETE, or any other HTTP request method
supported */
app.all('/section', (req, res, next) => {
  console.log('Accessing /section');
  next();
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

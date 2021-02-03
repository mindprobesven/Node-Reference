/*
Route parameters
-------------------------------------------------------------------------------------
*/

const express = require('express');

const app = express();
const port = 3000;

/*
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
*/
app.get('/users/:userId/books/:bookId', (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

// Hyphen (-) and the dot (.) are interpreted literally, they can be used along with route parameters
/*
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
*/
app.get('/flights/:from-:to', (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

/*
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
*/
app.get('/plantae/:genus.:species', (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

/* To have more control over the exact string that can be matched by a route parameter,
you can append a regular expression in parentheses (())
This example route executes only if the userId is an integer value */
/*
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
*/
app.get('/user/:userId(\\d+)', (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

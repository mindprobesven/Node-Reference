/* eslint-disable no-multi-spaces */
/* eslint-disable semi */
/*
Request object
-------------------------------------------------------------------------------------
*/

const express = require('express');

// The body-parsing middleware is needed to populate req.body for parsing application/json
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Request body is parsed for the '/add' route only
app.use('/add', bodyParser.json());   // for parsing application/json
app.use('/add', bodyParser.urlencoded({ extended: true }))    // for parsing application/x-www-form-urlencoded

app.get('/product/:id', (req, res) => {
  // Contains key-value pairs of data submitted in the request body. By default, it is
  // undefined, and is populated when you use body-parsing middleware such as body-parser and multer.
  console.log(req.body);
  console.log(req.cookies);
  // Contains the host derived from the Host HTTP header.
  console.log(req.hostname);
  // Contains the remote IP address of the request.
  console.log(req.ip);
  // Contains a string corresponding to the HTTP method of the request: GET, POST, PUT, and so on.
  console.log(req.method);
  console.log(req.originalUrl); // '/admin/new?sort=desc'
  console.log(req.baseUrl);     // '/admin'
  console.log(req.path);        // '/new'
  // Object containing the params in a route (:id)
  console.log(req.params);
  // Contains the request protocol string: either http or (for TLS requests) https.
  console.log(req.protocol);
  // A Boolean property that is true if a TLS connection is established.
  console.log(req.secure);
  console.log(req.get('Content-Type'));
  res.send('Done');
});

app.get('/query', (req, res) => {
  // Gets the query string parameters
  // curl -X GET "http://127.0.0.1:3000/query?name=tobi+ferret&age=40"
  console.log(req.query);   // { name: 'tobi ferret', age: '40' }
  res.send('Done');
});

// Sending JSON object data via POST
// curl -X POST --data '{"name":"Sven Kohn", "email":"sven@minprobe.io", "age": 50}' --header "Content-Type: application/json" http://127.0.0.1:3000/add
app.post('/add', (req, res) => {
  console.log(req.method);    // POST
  console.log(req.get('Content-Type'));   // application/json

  // Checks if the incoming request's 'Content-Type' matches the type specified
  // Returns the type if true, otherwise false
  console.log(req.is('application/json'));
  // Contains key-value pairs of data submitted in the request body.
  // By default, it is undefined, and is populated when you use body-parsing middleware such as body-parser.
  console.log(req.body);    // { name: 'Sven Kohn', email: 'sven@minprobe.io', age: 50 }

  res.send('Done');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

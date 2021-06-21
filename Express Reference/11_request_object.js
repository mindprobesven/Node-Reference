/* eslint-disable no-multi-spaces */
/*
Request object
-------------------------------------------------------------------------------------
*/

const express = require('express');

const app = express();
const port = 3000;

// Request body is parsed for the '/add' route only
app.use('/add', express.json());   // for parsing application/json
app.use('/add', express.urlencoded({ extended: true }));    // for parsing application/x-www-form-urlencoded

// Request body is parsed for the '/accept' route only
app.use('/accept', express.json());   // for parsing application/json
app.use('/accept', express.urlencoded({ extended: true }));    // for parsing application/x-www-form-urlencoded

app.get('/product/:id', (req, res) => {
  // Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is
  // populated when you use body-parsing middleware such as express.json() or express.urlencoded().
  console.log(req.body);
  console.log(req.cookies);
  // When the response is still “fresh” in the client’s cache true is returned, otherwise false is returned
  // to indicate that the client cache is now stale and the full response should be sent.
  console.log(`Fresh: ${req.fresh}`);
  // req.stale is the opposite of req.fresh
  console.log(`Stale: ${req.stale}`);
  // Contains the host derived from the Host HTTP header.
  console.log(req.hostname);
  // Contains the remote IP address of the request.
  console.log(req.ip);
  // Contains a string corresponding to the HTTP method of the request: GET, POST, PUT, and so on.
  console.log(req.method);

  // GET 'http://www.example.com/admin/new?sort=desc'
  console.log(req.url); // '/admin/new?sort=desc'
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
  console.log(req.is('application/json'));  // application/json
  console.log(req.body);    // { name: 'Sven Kohn', email: 'sven@minprobe.io', age: 50 }

  res.send('Done');
});

// This example shows how to check if a request header contains the fields 'Content-Type' and 'Accept' with an acceptable content type
//
// [PASSES] Because both Accept and Content-Type are specified and pass the allowed content type (application/json)
// curl -X POST --data '{"name":"Sven Kohn", "email":"sven@minprobe.io", "age": 50}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:3000/accept
// [FAILS] Returns 406 - Not Acceptable
// curl -X POST --data '{"name":"Sven Kohn", "email":"sven@minprobe.io", "age": 50}' http://127.0.0.1:3000/accept
// curl -X POST --data '{"name":"Sven Kohn", "email":"sven@minprobe.io", "age": 50}' -H "Accept: text/html" -H "Content-Type: application/json" http://127.0.0.1:3000/accept
app.post('/accept', (req, res) => {
  const allowedContentType = 'application/json';

  if (req.get('Content-Type') === allowedContentType
  && req.is('application/json')
  // Checks if the specified content types are acceptable, based on the request’s Accept HTTP header field. The method
  // returns the best match, or if none of the specified content types is acceptable, returns false (in which case, the
  // application should respond with 406 "Not Acceptable").
  && req.accepts('application/json')) {
    console.log('Allowed');
    console.log(req.body);
    res.status(200).send('200 - OK');
  } else {
    console.log('406 "Not Acceptable"');
    res.status(406).send('406 - Not Acceptable');
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

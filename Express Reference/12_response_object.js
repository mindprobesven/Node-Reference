/* eslint-disable no-unused-vars */
/* eslint-disable no-multi-spaces */
/*
Response object

The res object represents the HTTP response that an Express app sends when it gets
an HTTP request.

-------------------------------------------------------------------------------------
*/

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/send', (req, res) => {
  console.log(`[ GET ] - ${req.url}`);
  // res.send()
  // This method performs many useful tasks for simple non-streaming responses: For
  // example, it automatically assigns the Content-Length and Content-Type HTTP response header fields
  // (unless previously defined) and provides automatic HEAD and HTTP cache freshness
  // support.
  //
  // Sends JSON object response with Content-Type: application/json and status 200
  // res.send({ some: 'json' });
  // Sends text/html response with Content-Type: text/html and status 200
  res.send('<p>Some HTML</p>');
});

app.get('/send-json', (req, res) => {
  console.log(`[ GET ] - ${req.url}`);
  // res.json()
  // Sends a JSON response. This method sends a response (with the correct content-type)
  // that is the parameter converted to a JSON string using JSON.stringify().
  //
  // Sends JSON object response with Content-Type: application/json and status 200
  // res.json(null);
  // res.status(500).json({ error: 'message' })
  res.json({ some: 'json' });
});

app.get('/send-file', (req, res) => {
  console.log(`[ GET ] - ${req.url}`);
  // res.sendFile()
  // Transfers the file at the given path. Sets the Content-Type response HTTP header
  // field based on the filename’s extension.
  console.log(path.join(__dirname, 'public', 'index.html'));
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/status', (req, res) => {
  console.log(`[ GET ] - ${req.url}`);
  // res.status()
  // Sets the HTTP status for the response. res.status() is chainable.
  //
  // Sends only a status response and ends the response with end().
  // res.status(200).end();
  // Sends a status response with a custom message
  // res.status(404).send('Bad request');
  // Sends a status response and a custom HTML file or something else
  // res.status(404).sendFile('/absolute/path/to/404.html')
  // Sends a status response and its string representation as the response body
  res.sendStatus(200); // equivalent to res.status(200).send('OK')
});

app.get('/format', (req, res) => {
  console.log(`[ GET ] - ${req.url}`);
  // res.format()
  // Performs content-negotiation on the Accept HTTP header on the request object,
  // when present. It uses req.accepts() to select a handler for the request, based
  // on the acceptable types ordered by their quality values.
  //
  // Sends the text/html response
  // curl -X GET "http://127.0.0.1:3000/format" -H "Accept: text/html" -H "Content-Type: text/html"
  // Sends the application/json response JSON object
  // curl -X GET "http://127.0.0.1:3000/format" -H "Accept: application/json" -H "Content-Type: application/json"
  // Sends a 406
  // curl -X GET "http://127.0.0.1:3000/format" -H "Accept: png" -H "Content-Type: png"
  res.format({
    'text/html': () => {
      res.status(200).send('<p>Request Accept = text/html</p>');
    },
    'application/json': () => {
      res.status(200).send({ message: 'Request Accept = application/json' });
    },
    default: () => {
      res.status(406).send('Not Acceptable');
    },
  });
});

app.get('/location', (req, res) => {
  console.log(`[ GET ] - ${req.url}`);
  // res.location()
  // Sets the response Location HTTP header to the specified path parameter
  res.location('/format');
  res.status(200).send('OK');
});

app.get('/redirect', (req, res) => {
  console.log(`[ GET ] - ${req.url}`);
  // res.redirect()
  // Redirects to the URL derived from the specified path, with specified status
  res.redirect(301, '/format');   // 301 = Moved permanently
});

app.get('/custom-header', (req, res) => {
  console.log(`[ GET ] - ${req.url}`);
  // res.set()
  // Sets the response’s HTTP header fields.
  // res.type()
  // Sets the only the Content-Type HTTP header.
  // res.get()
  // Returns the HTTP response header specified by field. The match is case-insensitive.
  res.set({
    'Content-Type': 'application/json',
    'Some-Field': 'Some funky data',
  });

  res.type('application/json');   // Can also be done using res.set()

  console.log(res.get('Content-Type'));
  console.log(res.get('Some-Field'));

  res.status(200).send('OK');
});

app.get('/headers-sent', (req, res) => {
  console.log(`[ GET ] - ${req.url}`);
  // res.headersSent()
  // Boolean property that indicates if the app sent HTTP headers for the response.
  console.log(res.headersSent); // false
  res.sendStatus(200); // equivalent to res.status(200).send('OK')
  console.log(res.headersSent); // true
});

app.get('/locals', (req, res) => {
  console.log(`[ GET ] - ${req.url}`);
  // res.locals
  // An object that contains response local variables scoped to the request, and
  // therefore available only to the view(s) rendered during that request / response cycle
  console.log(res.locals.foo);  // undefined
  res.locals.foo = req.hostname;
  console.log(res.locals.foo);  // localhost
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

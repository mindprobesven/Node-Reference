/*
Hello World Server
-------------------------------------------------------------------------------------
Running a simple bare-bones express server.

This example creates a simple web server that outputs "Hello, World!" in the browser.

Usage:
npx nodemon 1_hello_world_server.js
*/

const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

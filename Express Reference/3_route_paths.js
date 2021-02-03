/*
Route paths
-------------------------------------------------------------------------------------
*/

const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

// This route path will match acd and abcd.
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd');
});

// This route path will match abcd, abbcd, abbbcd, and so on.
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd');
});

// This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd');
});

// This route path will match /abe and /abcde.
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e');
});

// Examples of route paths based on regular expressions
// --------------------------------------------------------------------------------

// This route path will match anything with an “a” in it.
app.get(/a/, (req, res) => {
  res.send('/a/');
});

// This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

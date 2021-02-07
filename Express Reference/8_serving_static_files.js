/*
Serving static files
-------------------------------------------------------------------------------------
To serve static files such as images, CSS files, and JavaScript files, use the
express.static built-in middleware function in Express.
*/

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve images, CSS files, and JavaScript files in a directory named public
// Example: http://localhost:3000/images/image.jpg
app.use(express.static('public'));

// Multiple static asset directories can be defined
app.use(express.static('files'));

// Create a virtual path prefix
app.use('/static', express.static('public'));
// Example: http://localhost:3000/static/images/image.jpg

// Using an absolute path in case the express app is run from another directory
app.use('/static', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

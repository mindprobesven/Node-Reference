/*
Modular route handlers
-------------------------------------------------------------------------------------
This example uses express.Router to create a modular, mountable route handler.
A Router instance is a complete middleware and routing system.

This example handles requests to /birds and /birds/about, as well as call the
middleware function that is specific to the route (/routes/birds_routes.js)
*/

const express = require('express');
const birdsRoutes = require('./routes/birds_routes');

const app = express();
const port = 3000;

app.use('/birds', birdsRoutes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

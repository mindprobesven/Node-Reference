const express = require('express');

const router = express.Router();

// Middleware function that executes on each request and before res.send()
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.send('Birds home page');
});

router.get('/about', (req, res) => {
  res.send('About birds');
});

module.exports = router;

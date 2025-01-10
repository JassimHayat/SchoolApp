// controllers/applications.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// we will build out our router logic here
// controllers/applications.js

router.get('/', (req, res) => {
    res.send('Hello applications index route!');
  });


module.exports = router;
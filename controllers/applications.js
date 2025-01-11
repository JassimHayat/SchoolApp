// controllers/applications.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// we will build out our router logic here


router.get('/', async (req, res) => {
  try {
    res.render('applications/index.ejs');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


/*
router.get('/', async (req, res) => {
  try {
    // find the user
    const currentUser = await User.findById(req.session.user._id);

    res.render('applications/index.ejs', {
      applications: currentUser.applications,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});
*/




/*
/*
router.get('/', (req, res) => {
    res.send('Hello applications index route!');
  });

*/

module.exports = router;
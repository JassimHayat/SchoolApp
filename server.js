const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const addUserToViews = require('./middleware/addUserToViews');
require('dotenv').config();
require('./config/database');


// Controllers
const authController = require('./controllers/auth');
const isSignedIn = require('./middleware/isSignedIn');
const applicationsController = require('./controllers/applications.js');
const School = require("./models/school.js");

const app = express();
// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';

// MIDDLEWARE

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(addUserToViews);

// Public Routes

app.get('/', (req, res) => {
  // Check if the user is signed in
  if (req.session.user) {
    // Redirect signed-in users to their applications index
    res.redirect(`/schools`);
  } else {
    // Show the homepage for users who are not signed in
    res.render('index.ejs');
  }
});


app.get('/schools/alNoor', async (req, res) => {

  const studentList = await School.find({school: "AlNoor"})

  res.render('schools/alNoor.ejs', {students: studentList});
 
});

app.get('/schools/apg', async (req, res) => {

  const studentList = await School.find({school: "apg"})

  res.render('schools/apg.ejs', {students: studentList});
 
});

app.get('/schools/bahrain', async (req, res) => {

  const studentList = await School.find({school: "bahrain"})

  res.render('schools/bahrain.ejs', {students: studentList});
 
});


app.get('/student/:studentId', async (req, res) => {

  res.render('schools/edit.ejs');
 
  }
  
);

////for


app.get('/new', async (req, res) => {
  res.render('schools/new.ejs');
});




app.post('/student', async (req, res) => {
  try {
    // Look up the user from req.session
    const student = new School(req.body)
    // Push req.body (the new form data object) to the
    // applications array of the current user
    // Save changes to the user
    await student.save();
    // Redirect back to the applications index view
    res.redirect(`/schools`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

/*
app.get('/protected', async (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.sendStatus(404);
    // res.send('Sorry, no guests allowed.');
  }
});
*/

app.use('/auth', authController);
// Protected Routes
app.use(isSignedIn);
app.use('/schools', applicationsController);


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`The express app is ready on port ${port}!`);
});
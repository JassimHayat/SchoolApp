// controllers/applications.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const School = require('../models/school.js')

// we will build out our router logic here

// show index page of schools
router.get('/schools', async (req, res) => {


  res.render('schools/index.ejs', );
 
});


router.get('/schools/alNoor', async (req, res) => {

  const studentList = await School.find({school: "AlNoor"})

  res.render('schools/alNoor.ejs', {students: studentList});
 
});

router.get('/schools/apg', async (req, res) => {

  const studentList = await School.find({school: "APG"})

  res.render('schools/apg.ejs', {students: studentList});
 
});

router.get('/schools/bahrain', async (req, res) => {

  const studentList = await School.find({school: "Bahrain"})

  res.render('schools/bahrain.ejs', {students: studentList});
 
});


///SHOW
router.get('/student/:studentId/show', async (req, res) => {
  
  const student = await School.findById(req.params.studentId);
  res.render('students/show.ejs', {student: student})
 
  }
  
);

//EDIT PAGE
router.get('/student/:studentId/edit', async (req, res) => {
  
  const student = await School.findById(req.params.studentId);
  res.render('students/edit.ejs', {student: student}); 
  }
  
);

//UPDATE
router.put('/student/:studentId/update', async (req, res) => {
  try {
    const student = await School.findById(req.params.studentId);
    //console.log(req.body);
    student.set(req.body);
    // Save the current user
    await student.save();
    // Redirect back to the applications index view
    res.redirect(`/schools`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

//DELETE
router.delete('/student/:studentId/delete', async (req, res) => {
  try {
    const student = await School.findByIdAndDelete(req.params.studentId);
    //student.deleteOne();
    await student.save();
    // Redirect back to the applications index view
    res.redirect(`/schools`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});



router.get('/new', async (req, res) => {
  res.render('students/new.ejs');
});




router.post('/student', async (req, res) => {
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

module.exports = router;
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Primary Level', 'Secondary Level','Graduated', 'Dismissal'],
  }


})

//This is for the school
const schoolSchema = new mongoose.Schema({


  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  notes: {
    type: String,
  },
  students: [studentSchema]


})

module.exports = mongoose.model('School', schoolSchema);

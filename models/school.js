const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  note: {
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
  email: {
    type: String,
  },
  note: {
    type: String,
  },
  students: [studentSchema]


})

module.exports = mongoose.model('School', schoolSchema);

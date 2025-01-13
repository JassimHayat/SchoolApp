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

  school: {
    type: String,
    enum: ['ABG','Bahrain', 'AlNoor'],
  },

})



module.exports = mongoose.model('School', studentSchema);

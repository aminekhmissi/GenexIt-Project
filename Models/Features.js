const mongoose = require('mongoose')
const featureSchema = new mongoose.Schema({
  description: {
    type: String,
    required: false
  },

  lodge: {
    type: mongoose.Types.ObjectId,
    ref: 'Lodge',
    required: false
  },
  rooms: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model('Feature', featureSchema)
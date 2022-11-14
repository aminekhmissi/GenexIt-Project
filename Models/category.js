const mongoose = require('mongoose')
const schemaCategory = new mongoose.Schema({
  name: {
    type: String
  },
  lodge: {
    type: mongoose.Types.ObjectId,
    ref: 'Lodge',
    required: false
  }
}, { timestamps: true })
module.exports = mongoose.model('Category', schemaCategory)
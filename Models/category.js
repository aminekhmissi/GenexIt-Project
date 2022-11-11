const mongoose = require('mongoose')
const schemaCategory = new mongoose.Schema({
  name: {
    type: String
  }
}, { timestamps: true })
module.exports = mongoose.model('Category', schemaCategory)
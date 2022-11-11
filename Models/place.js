const mongoose = require('mongoose')
const schemaPlace = new mongoose.Schema({
  title: {
    type: String,
  }


})
module.exports = mongoose.model('Place', schemaPlace)

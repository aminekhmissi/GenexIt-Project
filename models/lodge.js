const mongoose = require('mongoose')
const schemaLodge = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  adress: {
    type: String,
    required: true
  },
  nbPerson: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true

  },
  rooms: {
    type: Number
  }
}, { timestamps: true })
module.exports = mongoose.model('Lodge', schemaLodge)
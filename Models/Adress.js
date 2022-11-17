const mongoose = require('mongoose')
const adresssSchema = new mongoose.Schema({
  town: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  lodge: {
    type: mongoose.Types.ObjectId,
    ref: 'Lodge',
    required: true
  },
  postalCode: {
    type: Number,
    required: true,
  }

})
module.exports = mongoose.model('Adress', adresssSchema)
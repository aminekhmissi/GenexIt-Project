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
    required: false
  },
  postalCode: {
    type: Number,
    required: true,
  },
  lang: {
    type: String,
    required: false
  },
  at: {
    type: String,
    required: false
  }

})
module.exports = mongoose.model('Adress', adresssSchema)
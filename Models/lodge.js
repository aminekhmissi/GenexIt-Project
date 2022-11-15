const mongoose = require('mongoose')

const GallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const schemaLodge = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: false
  },
  adress: {
    type: String,
    required: true
  },
  galleries: [GallerySchema],
  nbPerson: {
    type: Number,
    required: false
  },
  price: {
    type: Number,
    required: false

  },
  rooms: {
    type: Number,
    required: false
  },
  place: {
    type: mongoose.Types.ObjectId,
    ref: 'Place',
    required: false

  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: false
  },
  equipments: [{
    type: mongoose.Types.ObjectId,
    ref: 'Equipments',
    required: false
  }],
  photos: {
    type: String
  }

}, { timestamps: true })
module.exports = mongoose.model('Lodge', schemaLodge)
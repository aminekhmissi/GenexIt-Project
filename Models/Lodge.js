const mongoose = require('mongoose');
const { checkout } = require('../Routers/adressRouter');
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
const reservedSchema = new mongoose.Schema({
  checkedIn: {
    type: Date,
    required: true
  },
  checkedOut: {
    type: Date,
    required: true,
  }
})

const schemaLodge = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: false
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
  comments: [{
    type: mongoose.Types.ObjectId,
    ref: 'Commentaire',
    required: false
  }],
  photos: {
    type: [String]
  },


  reservation: {
    type: mongoose.Types.ObjectId,
    ref: 'Reservation',
    required: false
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'Owner',
    required: false
  },
  feature: {
    type: mongoose.Types.ObjectId,
    ref: 'Feature',
    required: false
  },
  adress: {
    type: mongoose.Types.ObjectId,
    ref: 'Adress',
    required: false
  },
  dateDebut: {
    type: Date,
    required: false
  },
  datefin: {
    type: Date,
    required: false
  },
  reserved: [reservedSchema]
}
  , { timestamps: true })
module.exports = mongoose.model('Lodge', schemaLodge)
//
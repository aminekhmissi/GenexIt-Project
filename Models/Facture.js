const mongoose = require("mongoose")
const schemaFacture = new mongoose.Schema({
  ref: {
    type: String
  },
  reservation: {
    type: mongoose.Types.ObjectId,
    require: false
  },
  discount: {
    type: String,
    require: false
  }
}, { timestamps: true }
)
module.exports = mongoose.model('Facture', schemaFacture)
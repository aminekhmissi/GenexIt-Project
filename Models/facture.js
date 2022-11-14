const mongoose = require("mongoose")
const schemaFacture = new mongoose.Schema({
  ref: {
    type: String
  },
  discount: {
    type: String  }
}, { timestamps: true }
)
module.exports = mongoose.model('Facture', schemaFacture)

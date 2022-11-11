const mongoose = require('mongoose')
const schemaEquipments = new mongoose.Schema({
  name: {
    type: String
  }
},
  { timestamps: true })
module.exports = mongoose.model('Equipments', schemaEquipments)
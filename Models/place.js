const mongoose = require('mongoose')
const schemaPlace = new mongoose.Schema({
  name: {
    type: String,
  },
  lodges: [

    {
      type: mongoose.Types.ObjectId, //type du module mongoose
      ref: "Lodge",
    },
  ]

})
module.exports = mongoose.model('Place', schemaPlace)

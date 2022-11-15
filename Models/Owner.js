const mongoose = require('mongoose'); // Erase if already required
const User = require('./User')
// Declare the Schema of the Mongo model
var ownerSchema = new mongoose.Schema({
    picture: {
        type: String,
        required: false,
    },
    matricule: {
        type: String,
        required: false,
        unique: true,
    },
    address:{
        type:String,
        required:true
    },
    //relation
    lodges: [{
        type: mongoose.Types.ObjectId,
        ref: 'Lodge',
        required: false
    }]
}, { timestamps: true });

//Export the model
module.exports = User.discriminator('Owner', ownerSchema);
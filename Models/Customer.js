const mongoose = require('mongoose'); // Erase if already required
const User = require('./User')
// Declare the Schema of the Mongo model
var customerSchema = new mongoose.Schema({
    picture: {
        type: String,
        required: false,
    },
    cin: {
        type: String,
        required: true,
        unique: true,
    },
    address:{
       type:String,
       required:true
    },
    city:{
        type:String,
        required:true,
    },
    listFavoris:[{
        type:mongoose.Types.ObjectId,
        ref:"Lodge",
        required:false
    }],
     //relation:
    commentaires:[{
        type:mongoose.Types.ObjectId,
        ref:'Commentaire',
        required:false
    }],
    reservations: [{
        type: mongoose.Types.ObjectId,
        ref: 'Reservation',
        required: false
    }]
}, { timestamps: true });

//Export the model
module.exports = User.discriminator('Customer', customerSchema) 

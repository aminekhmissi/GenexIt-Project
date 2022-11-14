const mongoose = require('mongoose'); // Erase if already required
const User=require('./User')
// Declare the Schema of the Mongo model
var customerSchema = new mongoose.Schema({
    picture:{
        type:String,
        required:false,
    },
    cin:{
        type:String,
        required:true,
        unique:true,
    },
    city:{
        type:String,
        required:true,
    },
    //relation:
    commentaires:[{
        type:mongoose.Types.ObjectId,
        ref:'Commentaire',
        required:false
    }],
    reservations:[{
        type:mongoose.Types.ObjectId,
        ref:'Reservation',
        required:false
    }]
},{timestamps:true});

//Export the model
module.exports = User.discriminator('Customer', customerSchema);
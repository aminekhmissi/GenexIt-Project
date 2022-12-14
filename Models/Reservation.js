const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var reservationSchema = new mongoose.Schema({
    nights:{
        type:Number,
        default:"0",
        required:false,
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    checkIn:{
        type:Date,
        required:true,
    },
    checkOut:{
        type:Date,
        required:true,
    },
    confirmed:{
     type:Boolean,
     default:false,
     required:false
    },
    confirmationCode:{
        type:String,
        required:false,
    },
    //relation:
    customer:{
     type:mongoose.Types.ObjectId,
     ref:'Customer',
     required:true
    },
    facture:{
     type:mongoose.Types.ObjectId,
     ref:'Facture',
     required:false
    },
    lodge:{
        type:mongoose.Types.ObjectId,
        ref:'Lodge',
        required:false
    }
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Reservation', reservationSchema);
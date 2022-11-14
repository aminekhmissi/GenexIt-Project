const mongoose = require("mongoose");
const User = require("./User");
const schemaAdmin = new mongoose.Schema({}, { timestamps: true });
module.exports = User.discriminator("Admin", schemaAdmin);

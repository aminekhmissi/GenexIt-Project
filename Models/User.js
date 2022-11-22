const mongoose = require("mongoose");
const schemaUser = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    picture: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "",
      enum: ["Admin", "Customer", "Owner", "User"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: false,
    },
    verificationPassword: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", schemaUser);

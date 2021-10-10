// Initialize Mongodb
const mongoose = require("mongoose");

// create a userSchema template from mongoose Scheme
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  gender: {
    type: String,
  },
  plan: {
    type: String,
  },
  vehicleModal: {
    type: String,
  },
  vehicleNo: {
    type: String,
  },
});

// export the userScheme module
module.exports = mongoose.model("users", userSchema);

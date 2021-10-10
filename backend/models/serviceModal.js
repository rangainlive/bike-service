// Initialize Mongodb
const mongoose = require("mongoose");

// create a userSchema template from mongoose Scheme
const serviceSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: null,
  },
  serviceDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Pending",
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

// export the userScheme module
module.exports = mongoose.model("services", serviceSchema);
